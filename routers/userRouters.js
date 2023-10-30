const express = require("express");

const {
  getUser,
  getAlluser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {
  login,
  signup,
  protectRoute,
  isAuthorised,
  forgetPassword,
  resetPassword,
  logout,
} = require("../controllers/authController");
// app.use(cookieParser());
const userRouter = express.Router();

// userRouter
//   .route("/")
//   .get(protectRoute,getUser)//Middleware to protect data from not logged in user
//   .post(postUser)
//   .patch(updateUser)
//     .delete(deleteUser);

// userRouter.use() is used to apply middleware to the entire router and is often used for global or router-level middleware. Middleware functions defined within specific routes are used for route-specific operations. The key difference is in the scope of application: userRouter.use() affects all routes within the router, while route-specific middleware only affects the routes to which they are directly attached.

//Update and delete route for specific user
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

//Forget Password
userRouter.route("/forgetPassword").post(forgetPassword);

//Reset Password
userRouter.route("/resetPassword/:token").post(resetPassword);

//Logout route
userRouter.route("/logout").get(logout);
//Login route
userRouter.route("/login").post(login);

//Signup route
userRouter.route("/signup").post(signup);

//Profile Page
userRouter.use(protectRoute); //Global Middleware it passdown req res to next, Different way of writting Middleware
userRouter.route("/userProfile").get(getUser);

//Admin function
userRouter.use(isAuthorised(["admin"]));
userRouter.route("/").get(getAlluser);

// //Cookies
// userRouter.route("/setCookies").get(setCookies);
// userRouter.route("/getCookies").get(getCookies);
// function getCookies(req, res) {
//   let cookie = req.cookies.isLoggedIn;
//   console.log(cookie);
//   res.send("Cookie has been set");
// }

// function setCookies(req, res) {
//   //res.setHeader('Set-Cookie', 'isLoggedIn=true');
//   //HttpOnly security srf backend se cookie ko access krskte hai
//   //HttpOnly se frontend se koi cookie ko change ni kr payega
//   //Secure se srf HTTPS protocol pe access krskte hai
//   res.cookie("isLoggedIn", true, {
//     maxAge: 1000 * 60 * 60 * 24,
//     secure: true,
//     httpOnly: true,
//   });
//   res.send("Cookie has been set");
// }

module.exports = userRouter;
