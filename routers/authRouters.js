const express = require("express");
const userModel = require("../models/userModel");
const cookieParser = require("cookie-parser");
//Using JWT over Cookie for more functionality
const authRouter = express.Router();
//JWT have Header->Payload->Signature
// app.use(cookieParser());
const {JWT_KEY}=require('../secrets')
const jwt = require('jsonwebtoken');
authRouter.route("/login").post(loginUser);

async function loginUser(req, res) {
  try {
    let data = req.body;
    if (data.email && data.password) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        //bcrypyt->compare krna hoga yahan agar password encrypted hai
        if (user.password == data.password) {
          let payload = user['_id'];
          let jwt_token = jwt.sign({ payload: payload }, JWT_KEY);
           res.cookie('login',jwt_token,{httpOnly:true});
          return res.json({
            message: "Sucessfully Logged In",
            userDetails: data,
          });
        } else {
          return res.json({
            message: "Password is incorrect",
          });
        }
      } else {
        return res.json({
          message: "User not found please sign up",
        });
      }
    } else {
      return res.json({
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}
authRouter.route("/signup").get(middleware, getSignup).post(postSignup);
function middleware(req, res, next) {
  console.log("middleware encountered");
  next();
}
function getSignup(req, res) {
  //res.send("Hello");
  res.sendFile("/public/index.html", { root: __dirname });
}
function postSignup(req, res) {
  let obj = req.body;
  console.log("backend ", obj);
  res.json({
    message: "User Signed Up",
    data: obj,
  });
}
module.exports = authRouter;
