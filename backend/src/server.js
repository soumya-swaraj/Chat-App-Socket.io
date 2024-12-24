const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

require("./db");

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/user", userRouter);

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
