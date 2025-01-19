const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.route.js");
const cookieParser = require("cookie-parser");
const chatRouter = require("./routes/chat.route.js");
const messageRouter = require("./routes/message.route.js");
const { app, httpServer, io } = require("./socket.js");
const cors = require("cors");

dotenv.config();

require("./db");

app.use(cors({ origin: process.env.BASE_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);

httpServer.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on ${process.env.PORT || 4000}`);
});
