const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dli5cdsx2/image/upload/sec1axfueyux9h8mxava",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", schema);

module.exports = User;
