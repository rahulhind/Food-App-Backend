const mongoose = require("mongoose");
const db_link =
  "mongodb+srv://crud:rahul@cluster0.ujaysc4.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db_link)
  .then(function (db) {
    //console.log(db);
    console.log("MongoDB Plan connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const planSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, "Plan name should not exceed 20 characters"], //Custom error
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Price not entered"],
  },
  ratingsAverage: {
    type: Number,
  },
  discount: {
    type: Number,
    validate: [
      function () {
        return this.discount < 100;
      },
      "Discount should not exceed price",
    ],
  },
});
const planModel = mongoose.model("planModel", planSchema);
(async function createPlan() {
  let plan = {
    name: "Rahul",
    duration: 30,
    price: 10,
  };
  //Another way of creating model
  let data = await planModel.create(plan);
  //   const doc = new planModel(plan);
  //   await doc.save();
})();

module.exports = planModel;
