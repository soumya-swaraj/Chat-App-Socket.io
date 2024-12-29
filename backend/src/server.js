const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.route.js");
const cookieParser = require("cookie-parser");
const chatRouter = require("./routes/chat.route.js");
const messageRouter = require("./routes/message.route.js");
const cors = require("cors");

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

require("./db");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
