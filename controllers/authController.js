const userModel = require("../models/userModel");
const { JWT_KEY } = require("../secrets");
const jwt = require("jsonwebtoken");

//Signup user
module.exports.signup = async function signup(req, res) {
  try {
    let dataObj = req.body;
    let user = userModel.create(dataObj);
    if (user) {
      res.json({
        message: "User signed in successfull",
        data: user,
      });
    } else {
      res.json({
        message: "Error while signin",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//Login User
module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    if (data.email && data.password) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        //bcrypyt->compare krna hoga yahan agar password encrypted hai
        if (user.password == data.password) {
          let payload = user["_id"];
          let jwt_token = jwt.sign({ payload: payload }, JWT_KEY);
          res.cookie("login", jwt_token, { httpOnly: true });
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
};

//Is Authorized to check ths user's role (admin,user,deliveryboy,owner, etc)

module.exports.isAuthorised = function isAuthorised(roles) {
  return async function (req, res, next) {
    //console.log(roles);
    // console.log(req.role);
    if ((await roles.includes(req.role)) == true) {
      next();
    } else {
      res.status(401).json({
        message: "Unauthorised user",
      });
    }
  };

  // return 1;
};

//Protect Route
module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      token = req.cookies.login;
      //jwt.verify returns payload {payload:_id} payload contain unique id which we stored from mongodb
      let payload = jwt.verify(token, JWT_KEY);

      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        next();
      } else {
        //Agar request Chrome browser se aai hai to redirect krdo
        const client = req.get("User-Agent");
        if (client.includes("Chrome") == true) {
          return res.redirect("/login");
        }
        //postman ke liye
        return res.json({
          message: "Please login again",
        });
      }
    } else {
      return res.json({
        message: "Please login to continue",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

//Forget Password
module.exports.forgetPassword = async function forgetPassword(req, res) {
  let { userEmail } = req.body;
  try {
    const user = await userModel.findOne({ email: userEmail });
    if (user) {
      //createToken is used to create new Token
      const resetToken = user.createToken(); //We can create method of document, for more details refer documment
      //Link-> http://abc.com//resetPassword/token
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}//resetPassword/${resetToken}`;
      //Send mail to user
      //nodemailer
    } else {
      return res.json({
        message: "Please Sign Up",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//Reset Password
module.exports.resetPassword = async function resetPassword(req, res) {
  try {
    const token = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      //resetPasswordHelper will update user's password in database
      user.resetPasswordHelper();
      await user.save();
      res.json({
        message: "User password changed successfully please login again",
      });
    } else {
      res.json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//Logout
module.exports.logout = function logout(req, res) {
  //Ye 'login' naam ka cookie ko dhundega usko ' 'empty space se replace krdega fir 1milli Seconds me destroy krdega
  res.cookie("login", " ", { maxAge: 1 });
  res.json({
    message: "User logged out successfully",
  });
};
