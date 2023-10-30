//Creating middleware to protect getUser Route
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require("../secrets");

function protectRoute(req, res, next) {
    if (req.cookies.login) {
        let isveriFied=jwt.verify(req.cookies.login,JWT_KEY);
        if(isveriFied)
            next();
        else 
        return res.json({
            message: "Unauthorized user"
        })
    } else {
        return res.json({
            message: "Please login to continue"
        })
        }
}
module.exports = protectRoute;