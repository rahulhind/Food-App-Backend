const express = require("express");
const { protectRoute, isAuthorised } = require("../controllers/authController");
const {
  getAllReviews,
  getPlanReviews,
  createReviews,
  updateReviews,
  deleteReviews,
  top3reviews,
} = require("../controllers/reviewController");
const reviewRouters = express.Router();

reviewRouters.route("/all").get(getAllReviews);
reviewRouters.route("/top3").get(top3reviews);
//Send plan id to getPlanReviews
reviewRouters.route("/:id").get(getPlanReviews);

reviewRouters.use(protectRoute);
//Pass id of review in req body for Update and Delete route
reviewRouters
  .route("/crud/:plan")
  .post(createReviews)
  .patch(updateReviews)
  .delete(deleteReviews);

module.exports = reviewRouters;
