const express = require("express");
const {
  getMessagesByChatID,
  sendMessage,
} = require("../controllers/message.controller");
const { authUser } = require("../middlewares/user.middleware");

const router = express.Router();

router.get("/:id", authUser, getMessagesByChatID);
router.post("/", authUser, sendMessage);

module.exports = router;
