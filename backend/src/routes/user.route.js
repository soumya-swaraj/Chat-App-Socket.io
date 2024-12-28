const express = require("express");
const User = require("../models/user.model.js");
const {
  signup,
  login,
  logout,
  getUser,
  checkUsername,
} = require("../controllers/user.controller.js");
const { authUser } = require("../middlewares/user.middleware.js");

const router = express.Router();

router.post("/", signup);
router.get("/", authUser, getUser);
router.post("/login", login);
router.get("/logout", logout);
router.get("/check/:username", checkUsername);

module.exports = router;
