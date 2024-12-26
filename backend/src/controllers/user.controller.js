const User = require("../models/user.model.js");
const { generateToken } = require("../util/user.util.js");
const cloudinary = require("../util/cloudinary.util.js");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { username, email, password, profilePic } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Username, email, password are mandatory",
    });
  }
  try {
    const existingUserWithEmail = await User.find({ email });
    if (existingUserWithEmail.length !== 0) {
      return res.status(400).json({
        status: "fail",
        message: "User already exists with that email",
      });
    }
    const existingUserWithUsername = await User.find({ username });
    if (existingUserWithUsername.length !== 0) {
      return res.status(400).json({
        status: "fail",
        message: "User already exists with that username",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let profilePicUrl;
    if (profilePic) {
      profilePicUrl = await cloudinary.uploader.upload(profilePic).secure_url;
    }
    const user = await new User({
      username,
      email,
      password: hashedPassword,
      ...(profilePic && { profilePic: profilePicUrl }),
    }).save();
    generateToken(user._id, res);
    delete user.password;
    const filteredUser = {
      username: user.username,
      _id: user._id,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    };
    return res.status(201).json({
      status: "success",
      data: { user: filteredUser },
    });
  } catch (error) {
    console.log("signup function - user.controller.js", error);
    return res.status(400).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User doesn't exist",
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        status: "fail",
        message: "Password doesn't match",
      });
    }
    generateToken(user._id, res);
    const filteredUser = {
      username: user.username,
      _id: user._id,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    };
    return res.status(200).json({
      status: "success",
      data: { user: filteredUser },
    });
  } catch (error) {
    console.log("login function - user.controller.js", error);
    return res.status(400).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("sessionID", "", { maxAge: 0 });
    return res.status(200).json({
      status: "success",
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.log("logout function - user.controller.js", error);
    return res.status(400).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const getUser = (req, res) => {
  const user = req.user;
  const filteredUser = {
    username: user.username,
    _id: user._id,
    email: user.email,
    profilePic: user.profilePic,
    createdAt: user.createdAt,
  };
  res.status(200).json({
    status: "success",
    data: { user: filteredUser },
  });
};

module.exports = { signup, login, logout, getUser };
