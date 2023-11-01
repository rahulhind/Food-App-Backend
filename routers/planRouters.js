const express = require("express");
const { protectRoute, isAuthorised } = require("../controllers/authController");
const {
  getAllPlans,
  getPlans,
  createPlans,
  updatePlans,
    deletePlans,
  top3plans
} = require("../controllers/planControllers");
const planRouter = express.Router();

planRouter.route('/allPlans').get(getAllPlans);


//Top 3 plans
planRouter.route("/top3").get(top3plans);

//Own plan
//protectRoute Middleware lgake login, authorization check kar rhe
planRouter.use(protectRoute); //Global middleware, jo hamesa invoke hoga order by order
planRouter.route("/:id").get(getPlans);//Enter Plan ID not User ID


//Only admin and owner niche ke routes access krskta
planRouter.use(isAuthorised(["admin", "owner"])); //Global Middleware
planRouter.route("/crudPlan").post(createPlans);//Enter Plan Id in :id
planRouter.route("/crudPlan/:id").patch(updatePlans).delete(deletePlans);


module.exports = planRouter;
