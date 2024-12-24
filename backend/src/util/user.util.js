const jwt = require("jsonwebtoken");

const day = 7;

const generateToken = (userID, res) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET_KEY, {
    expiresIn: day + "d",
  });

  res.cookie("sessionID", token, {
    maxAge: day * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

module.exports = { generateToken };
