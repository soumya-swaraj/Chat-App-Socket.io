const express = require("express");
const {
  getMessagesByChatID,
  sendMessage,
} = require("../controllers/message.controller");

const router = express.Router();

router.get("/:id", getMessagesByChatID);
router.post("/", sendMessage);

module.exports = router;
