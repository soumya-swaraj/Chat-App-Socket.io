const Message = require("../models/message.model.js");
const cloudinary = require("../util/cloudinary.util.js");

const getMessagesByChatID = async (req, res) => {
  const { id: chatID } = req.params;
  try {
    const messages = await Message.find({ chatID });
    req.status(200).json({
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
  const { chatID, text, image } = req.body();
  if (!text && !image) {
    res.status(400).json({
      status: "fail",
      message: "Message content is missing",
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
    //todo: if user is online then send the message by Socket.io
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
