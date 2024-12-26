const express = require("express");
const Chat = require("../models/chat.model.js");
const { authUser } = require("../middlewares/user.middleware.js");
const {
  createNewChat,
  getChats,
} = require("../controllers/chat.controller.js");

const router = express.Router();

router.post("/", authUser, createNewChat);
router.get("/", authUser, getChats);

module.exports = router;
