const express = require("express");
const Chat = require("../models/chat.model.js");
const { authUser } = require("../middlewares/user.middleware.js");
const {
  createNewChat,
  getChats,
  checkPvtChatByMembers,
} = require("../controllers/chat.controller.js");

const router = express.Router();

router.post("/", authUser, createNewChat);
router.get("/", authUser, getChats);
router.get("/check", authUser, checkPvtChatByMembers);

module.exports = router;
