const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.sessionID;
    if (!token)
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized access - No token provided",
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized access - Invalid token",
      });
    }

    const user = await User.findById(decoded.userID);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized access - User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("authUser function - user.middleware.js", error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error.",
    });
  }
};

module.exports = { authUser };
