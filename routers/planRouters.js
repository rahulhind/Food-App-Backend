const express = require("express");
const { protectRoute, isAuthorised } = require("../controllers/authController");
const planRouter = express.Router();


//Own plan
//protectRoute Middleware lgake login, authorization check kar rhe
planRouter.use(protectRoute);//Global middleware, jo hamesa invoke hoga order by order
planRouter.route("/plan/:id").get(getPlan);
//Only admin and owner niche ke routes access krskta
planRouter.use(isAuthorised(['admin','owner']))//Global Middleware
planRouter.route("/crudPlan").post(createPlan).patch(updatePlan).delete(deletePlan);