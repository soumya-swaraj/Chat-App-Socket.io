const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  chatName: {
    type: String,
  },
  image: {
    type: String,
  },
  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  isGroupChat: {
    type: Boolean,
    required: true,
  },
});

const Chat = mongoose.model("Chat", schema);

module.exports = { Chat };
