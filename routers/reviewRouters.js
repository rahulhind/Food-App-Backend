const express = require("express");
const { protectRoute, isAuthorised } = require("../controllers/authController");
const {
  getAllReviews,
  getPlanReviews,
  createReviews,
  updateReviews,
    deleteReviews,
  top3reviews
} = require("../controllers/reviewController");
const reviewRouters = express.Router();

reviewRouters.route("/all").get(getAllReviews);
reviewRouters.route("/top3").get(top3reviews);
reviewRouters.route("/:id").get(getPlanReviews);

reviewRouters.use(protectRoute);
reviewRouters.route("/crud/:plan").post(createReviews);
reviewRouters.route("/crud/:id").patch(updateReviews).delete(deleteReviews);

module.exports = reviewRouters;