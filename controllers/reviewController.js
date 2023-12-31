const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModels");

module.exports.getAllReviews = async function getAllReviews(req, res) {
  try {
    let reviews = await reviewModel.find();
    if (reviews) {
      return res.json({
        message: "All reviews retrieved",
        data: reviews,
      });
    } else {
      return res.json({
        message: "No reviews available",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
//Get all the review of particular plan using plan id
module.exports.getPlanReviews = async function getPlanReviews(req, res) {
  try {
    let planId = req.params.id;
    
    let reviews = await reviewModel.find();
    reviews=reviews.filter(review => review.plan._id == planId);
    if (reviews) {
      return res.json({
        message: "Review retrieved",
        data: reviews,
      });
    } else {
      return res.json({
        message: "Plan not found or Enter Plan Id correctly",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.deleteReviews = async function deleteReviews(req, res) {
  try {
    //let id = req.params.plan;

     //Review ki id
    let id = req.body.id;
   
    let deletedData = await reviewModel.findByIdAndDelete(id);

    return res.json({
      message: "Deleted Successfully",
      data: deletedData,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.createReviews = async function createReviews(req, res) {
  try {
    let planId = req.params.plan;
    if (planId) {
      let plan = planModel.findById(planId);
      let review = await reviewModel.create(req.body);
      plan.ratingsAverage = (plan.ratingsAverage + req.body.ratings) / 2;
      await plan.save;
      res.json({
        message: "Review Created",
        data: review,
      });
    } else {
      res.json({
        message: "Incorrect Plan Id",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.updateReviews = async function updateReviews(req, res) {
  try {
    // let id = req.params.plan;
    //Review ki id
    let id = req.body.id;
    //console.log(id);
    let dataToBeUpdated = req.body;
    let review = await reviewModel.findById(id);
    //  console.log(plan);
    if (review) {
      let keys = [];
      for (let key in dataToBeUpdated) {
        //if (key == id) continue;
        keys.push(key);
      }
      for (let i = 0; i < keys.length; i++) {
        review[keys[i]] = dataToBeUpdated[keys[i]];
      }
      await review.save;
      return res.json({
        message: "Review Updated Successfully",
        data: review,
      });
    } else {
      return res.json({
        message: "Review Id Incorrect",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.top3reviews = async function top3reviews(req, res) {
  try {
    //Limit will return 3 objects and sort:-1 will sort in descending order
    const topReviews = await reviewModel.find().sort({ rating: -1 }).limit(3);
    if (topReviews) {
      return res.json({
        message: "Top 3 reviews",
        data: topReviews,
      });
    } else {
      return res.json({
        message: "Can't fetch reviews",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
