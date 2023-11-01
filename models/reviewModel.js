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

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    require: [true, "Review is required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Rating is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    required: [true, "Review must belong to user"],
  },
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: "planModel",
    required: [true, "Review must belong to plan"],
  },
});
//Whenever we will use find ,findById, findOne this hook will get activate
// /^find/ is a regular expression

/*So, this middleware is used to automatically populate 
the user and plan fields of documents returned by queries 
that start with "find." It can be useful when you want to
 retrieve related data from other collections in a single 
 query, rather than making separate queries for populating 
 referenced documents.
 */
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name profileImage",
  }).populate("plan");
  next();
});

const reviewModel = mongoose.model("reviewModel", reviewSchema);

module.exports = reviewModel;
