const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then((con) => {
    console.log(`Connected to DB : ${con.connection.host}`);
  })
  .catch((error) => {
    console.log("Unable to connect to DB.\n", error);
  });
