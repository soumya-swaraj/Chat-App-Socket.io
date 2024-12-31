const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
        "https://res.cloudinary.com/dli5cdsx2/image/upload/v1735420627/m2roxyccjigixm3fraqr.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", schema);

module.exports = User;
