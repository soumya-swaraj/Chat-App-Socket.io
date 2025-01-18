const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.BASE_URL },
});

io.on("connection", (socket) => {
  // console.log(`Connected! Socket ID: ${socket.id}`);
  socket.on("join chats", (chatIDs) => {
    chatIDs.forEach((chatID) => {
      // console.log(`Socket ID: ${socket.id} joined chat: ${chatID}`);
      socket.join(chatID);
    });
  });

  socket.on("disconnect", () => {
    // console.log(`disconnected! Socket ID: ${socket.id}`);
  });
});

module.exports = { app, httpServer, io };
