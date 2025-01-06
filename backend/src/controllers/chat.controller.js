const { Chat } = require("../models/chat.model.js");
const cloudinary = require("../util/cloudinary.util.js");

const createNewChat = async (req, res) => {
  try {
    const { chatName, admins, members, isGroupChat, image } = req.body;
    if (!members || typeof isGroupChat === "undefined") {
      return res.status(400).json({
        status: "fail",
        message: "members, isGroupChat are mandatory",
      });
    }
    let imgUrl;

    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image);
      imgUrl = uploadRes.secure_url;
    }
    const chat = await new Chat({
      ...(image && { image: imgUrl }),
      ...(chatName && { chatName }),
      ...(admins && { admins }),
      members,
      isGroupChat,
    }).save();
    return res.status(201).json({
      status: "success",
      data: { chat },
    });
  } catch (error) {
    console.log(`createNewChat - chat.controller.js ${error}`);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
const getChats = async (req, res) => {
  try {
    const { _id: userID } = req.user;

    const chats = await Chat.find({ members: { $in: [userID] } });
    return res.status(200).json({
      status: "success",
      data: { chats },
    });
  } catch (error) {
    console.log(`getChats - chat.controller.js ${error}`);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const checkPvtChatByMembers = async (req, res) => {
  try {
    const members = req.query.members.split(",");
    if (members.length !== 2) {
      return res.status(400).json({
        status: "fail",
        message: "Input is not valid",
      });
    }
    const chat = await Chat.findOne({
      isGroupChat: false,
      members: { $size: 2, $all: members },
    });
    return res.status(200).json({
      status: "success",
      data: { chat },
    });
  } catch (error) {
    console.log("checkPvtChatByMembers - chat.controller.js ", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
};

module.exports = { createNewChat, getChats, checkPvtChatByMembers };
