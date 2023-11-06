const express = require("express");
const multer = require("multer");
const {
  getUser,
  getAlluser,
  updateUser,
  deleteUser,
  uploadProfileImage
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

//Multer is a middleware jo file or image upload krne me help krta hai
//Upload-> Where to store, filter the data
const multerStorage = multer.diskStorage({
  //destination to store files
  destination: function (req, file, cb) {
    //call back(cb) function take (error,destination)
    cb(null,'public/images')
  }, 
  //To store unique files
  filename: function (req, file, cb) {
    console.log("Coming");
    cb(null, `user-${Date.now()}.jpeg`)
  }
});

//Koi galat file upload krde usse bchane ke liye filter
const filter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null,true)
  } else {
    cb(new Error("Not an Image! Please upload an Image"),false)
  }
}
//This code comes from documentation
const upload = multer({
  storage: multerStorage,
  fileFilter:filter
})
//upload ke andar bht sare functions hote hai jaise single, array
  //Aur single ke andar 'photo' Multer ke html ke same hona chaiye
userRouter.post("/ProfileImage", upload.single('photo'), uploadProfileImage)
userRouter.get("/ProfileImage", (req, res) => {
  res.sendFile("C:/Users/ASUS/OneDrive/Desktop/Backend Development/app/multer.html")
})
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
