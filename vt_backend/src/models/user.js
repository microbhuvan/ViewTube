const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
      default:
        "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=",
    },
    likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],

    subscribedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], //this will store others' userid

    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
