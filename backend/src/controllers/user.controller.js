const User = require("../models/user.model.js");
const { generateToken } = require("../util/user.util.js");
const cloudinary = require("../util/cloudinary.util.js");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { username, email, password, profilePic, name } = req.body;
  if (!username || !email || !password || !name) {
    return res.status(400).json({
      status: "fail",
      message: "Username, email, password and name are mandatory",
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
      name,
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
    name: user.name,
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

const getAllUser = async (req, res) => {
  const { regex } = req.params;
  try {
    const users = await User.find({
      username: { $regex: regex, $options: "i" },
    });
    return res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    return res.status(200).json({
      status: "fail",
      message: "Internal server error",
    });
  }
  // const user = req.user;
  // const filteredUser = {
  //   username: user.username,
  //   _id: user._id,
  //   email: user.email,
  //   profilePic: user.profilePic,
  //   createdAt: user.createdAt,
  // };
  // res.status(200).json({
  //   status: "success",
  //   data: { user: filteredUser },
  // });
};

const checkUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(200).json({
        status: "success",
        message: "Username is available",
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "Username is not available",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const updateProfilePic = async (req, res) => {
  const { _id } = req.user;
  const { profilePic } = req.body;
  if (!profilePic) {
    return res
      .status(400)
      .json({ status: "fail", message: "Provide profile picture" });
  }
  try {
    const uploadedImg = await cloudinary.uploader.upload(profilePic);
    const profilePicUrl = uploadedImg.secure_url;

    const updatedUser = await User.findByIdAndUpdate(
      { _id },
      { profilePic: profilePicUrl },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    res.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const getUserByID = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");
    if (!user)
      return res.status(400).json({
        status: "fail",
        message: "Invalid user id",
      });

    if (user)
      return res.status(200).json({
        status: "success",
        data: { user },
      });
  } catch (error) {
    console.log("getUserByID - user.controller.js ", error);
    return res.status(200).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
  getUser,
  checkUsername,
  updateProfilePic,
  getAllUser,
  getUserByID,
};
