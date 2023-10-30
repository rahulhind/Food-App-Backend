const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const db_link =
  "mongodb+srv://crud:rahul@cluster0.ujaysc4.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    //console.log(db);
    console.log("MongoDB connected");
  })
  .catch(function (err) {
    console.log(err);
  });

//Creating MongoDB Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    reequired: true,
  },
  confirmPassword: {
    type: String,
    required: function () {
      //This helps to avoid Confirm Password Validation error while updating to database
      return this.isNew;
    },
    validate: function () {
      return this.password == this.confirmPassword;
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "restaurantOwner", "deliveryBoy"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "img/users/default.jpeg",
  },
  resetToken: String,
});

//removing confirm password because it is redundant data using prehook
//Pre hook->event happen before saving in the database
userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});

userSchema.methods.createResetToken = function () {
  //creating unique token usig npm i crypto
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken;
  return resetToken;
};

userSchema.methods.resetPasswordHelper = function (password, confirmPassword) {
  this.password = password;
  this.confirmPassword = confirmPassword;
  //After successfull reset undefined resetToken from schema as it is of no use
  this.resetToken = undefined;
};



//Encrypting saved password
// userSchema.pre('save', async function () {
//     let salt = await bcrypt.genSalt();
//     let hashed = await bcrypt.hash(this.password, salt);
//     //console.log(hashed);
//     this.password = hashed;

// })
//**********Mongoose Hooks******** */
//*IMPORTANT* -> Call this hook above mongoose.model to get run

// //Establizing MongoDB to do operation on mongoDB
// userSchema.pre('save', function() {
//     console.log('Pre save',this); // Will be executed
//   });
// //Post hook->events happen after data is saved in the database
// userSchema.post('save', function(doc) {
//     console.log('Post save',doc); // Will be executed
// });

//******Hooks End */
const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
