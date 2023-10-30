const mongoose = require("mongoose");
const emailValidator=require('email-validator')
const express = require("express");
const userModel = require('./models/userModel');

const app = express();
app.use(express.json());
app.listen(3000);
app.use(cookieParser());
const userRouter = express.Router();
app.use("/user", userRouter);
userRouter
  .route("/")
  .get(getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

//Cookies
userRouter.route("/setCookies").get(setCookies);
userRouter.route("/getCookies").get(getCookies);
function getCookies(req, res) {

  let cookie = req.cookies.isLoggedIn;
  console.log(cookie);
  res.send("Cookie has been set");
}
function setCookies(req, res) {
  //res.setHeader('Set-Cookie', 'isLoggedIn=true');
  //HttpOnly security srf backend se cookie ko access krskte hai
  //HttpOnly se frontend se koi cookie ko change ni kr payega
  //Secure se srf HTTPS protocol pe access krskte hai
  res.cookie("isLoggedIn", true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
  res.send("Cookie has been set");
}


//###############################MongDB Starts###################
// //Connecting MongoDB
// const db_link =
//   "mongodb+srv://crud:rahul@cluster0.ujaysc4.mongodb.net/?retryWrites=true&w=majority";
// mongoose
//   .connect(db_link)
//   .then(function (db) {
//     //console.log(db);
//     console.log("MongoDB connected");
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// //Creating MongoDB Schema
// const userSchema = mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//       unique: true,
//       validate: function () {
//           return emailValidator.validate(this.email);
//     }
//   },
//   password: {
//     type: String,
//     reequired: true,
//   },
//   confirmPassword: {
//     type: String,
//       required: true,
//       validate: function () {
//           return this.password ==this.confirmPassword;
//     }
//   },
// });

// //removing confirm password because it is redundant data using prehook
// userSchema.pre('save', function () {
//     this.confirmPassword = undefined;
// })
// //**********Mongoose Hooks******** */
// //*IMPORTANT* -> Call this hook above mongoose.model to get run

// // //Establizing MongoDB to do operation on mongoDB
// // userSchema.pre('save', function() {
// //     console.log('Pre save',this); // Will be executed
// //   });
// // //Post->after save events occur in database
// // userSchema.post('save', function(doc) {
// //     console.log('Post save',doc); // Will be executed
// // });
  
// //******Hooks End */
// const userModel = mongoose.model("userModel", userSchema);

//###############################MongDB ends###################

// //Creating Immediately Invoking Function(IIF) to insert Sample Data
// (async function createUser() {
//     let user = {
//         name: "Rahul",
//         email: "rahul@gmail.com",
//         password: "123456",
//         confirmPassword: "123456"
//     };
//     await userModel.create(user);
// })();

//Mongoose hooks
//Works like middleware to do operations before or after saving data into database

//Pre-> before save events occur in database


async function getUser(req, res) {
  let users = await userModel.find();
  res.json({
    message: "List of all users",
    data: users,
  });
}

async function postUser(req, res) {
  let data = req.body;
  let created = await userModel.create(data);
  res.json({
    message: "User inserted in the database",
    data: created,
  });
}
async function updateUser(req, res) {
  let dataToBeUpdated = req.body;
  let updated = await userModel.findOneAndUpdate(
    { email: "rahul@gmail.com" },
    dataToBeUpdated
  );
  res.json({
    message: "Updated",
    data: updated,
  });
}
async function deleteUser(req, res) {
  let del = await userModel.findOneAndDelete({ email: "rahul@gmail.com" });
  res.json({
    message: "Deleted",
    data: del,
  });
}
