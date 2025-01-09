const Message = require("../models/message.model.js");
const { io } = require("../socket.js");
const cloudinary = require("../util/cloudinary.util.js");

console.log(io);

const getMessagesByChatID = async (req, res) => {
  const { id: chatID } = req.params;
  try {
    const messages = await Message.find({ chatID });
    res.status(200).json({
      status: "success",
      data: { messages },
    });
  } catch (error) {
    console.log(`getMessagesByChatID - message.controller.js ${error}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const sendMessage = async (req, res) => {
  const senderID = req.user._id;
  const { chatID, text, image } = req.body;
  if (!text && !image) {
    return res.status(400).json({
      status: "fail",
      message: "Message content is missing",
    });
  }
  if (!chatID) {
    return res.status(400).json({
      status: "fail",
      message: "Chat ID is missing",
    });
  }
  try {
    let imageUrl;
    if (image) {
      imageUrl = await cloudinary.uploader.upload(profilePic).secure_url;
    }
    const message = await new Message({
      senderID,
      chatID,
      ...(text && { text }),
      ...(image && { image: imageUrl }),
    }).save();

    io.to(chatID).emit("new message", message);

    res.status(200).json({
      status: "success",
      data: { message },
    });
  } catch (error) {
    console.log(`sendMessage - message.controller.js ${error}`);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = { getMessagesByChatID, sendMessage };
