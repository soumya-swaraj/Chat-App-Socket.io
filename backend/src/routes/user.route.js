const express = require("express");
const User = require("../models/user.model.js");
const {
  signup,
  login,
  logout,
  getUser,
  checkUsername,
  updateProfilePic,
  getAllUser,
} = require("../controllers/user.controller.js");
const { authUser } = require("../middlewares/user.middleware.js");

const router = express.Router();

router.post("/", signup);
router.get("/", authUser, getUser);
router.get("/:regex", authUser, getAllUser);
router.post("/login", login);
router.get("/logout", logout);
router.get("/check/:username", checkUsername);
router.patch("/update/profilePic", authUser, updateProfilePic);

module.exports = router;
