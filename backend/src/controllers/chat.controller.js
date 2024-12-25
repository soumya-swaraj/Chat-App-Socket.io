const { Chat } = require("../models/chat.model.js");

const createNewChat = async (req, res) => {
  try {
    const { chatName, admins, members, isGroupChat } = req.body;
    if (!members || !isGroupChat) {
      return res.status(400).json({
        status: "fail",
        message: "members, isGroupChat are mandatory",
      });
    }
    const chat = await new Chat({
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

module.exports = { createNewChat, getChats };
