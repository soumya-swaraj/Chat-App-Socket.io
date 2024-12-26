const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  senderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chatID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  text: { type: String },
  image: { type: String },
});

const Message = mongoose.model("Message", schema);

module.exports = Message;
