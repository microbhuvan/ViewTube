const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const { Video } = require("../models/video");

exports.signUp = async (req, res) => {
  try {
    const { userName, password, emailId, about, profilePic } = req.body;

    if (!userName || !password || !emailId) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    const isExist = await User.findOne({ userName });
    if (isExist) {
      return res
        .status(400)
        .json({ error: "Username already exists. Please try another." });
    }

    const emailExists = await User.findOne({ emailId });
    if (emailExists) {
      return res
        .status(400)
        .json({ error: "Email already in use. Please try another." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      userName,
      password: hashedPassword,
      emailId,
      about,
      profilePic,
    });

    await user.save();

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { password: _, ...safeUser } = user._doc;
    //fetched from mongodb

    return res.status(200).json({
      message: "Logged in successfully",
      success: true,
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const logInUser = await User.findOne({ userName });

    if (logInUser) {
      const logInUserPassword = logInUser.password;
      const isMatch = await bcrypt.compare(password, logInUserPassword);

      if (isMatch) {
        const token = await JWT.sign(
          { id: logInUser.id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        console.log("from login", token);
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          maxAge: 24 * 60 * 60 * 1000,
        });
        const user = logInUser;

        return res.status(200).json({
          message: "logged in successfully",
          success: true,
          token: token,
          user: user,
        });
      } else {
        return res.status(401).json({ error: "invalid credentials" });
      }
    } else {
      return res.status(400).json({ error: "user doesnt exist" });
    }
  } catch (err) {
    return res.status(500).json({ error: "server error" });
  }
};

exports.logOut = async (req, res) => {
  res.cookie("token", null, { expiresIn: new Date(Date.now()) });
  return res.status(200).json({ message: "logout successfull" });
};

exports.subscribe = async (req, res) => {
  try {
    const userId = req.user.id; //user who is subscribing
    const user = await User.findById(userId);

    const videoId = req.params.id; //video id
    const video = await Video.findById(videoId).populate(
      "user",
      "_id userName"
    );
    console.log("video", video);

    if (!video) {
      return res.status(404).json({ message: "video doesnt exist" });
    }
    if (!user) {
      return res.status(404).json({ message: "user doesnt exist" });
    }

    const videoUserId = video.user._id;

    if (videoUserId == userId) {
      return res
        .status(400)
        .json({ message: "you cannot subscribe to yourself" });
    }

    await User.findByIdAndUpdate(userId, {
      $addToSet: { subscribedTo: videoUserId }, //userId subscribing to channel videoId channel
    });

    await User.findByIdAndUpdate(videoUserId, {
      $addToSet: { subscribers: userId }, //videoId channel getting new user
    });
    return res.status(200).json({ message: "subsribed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json("error");
  }
};

exports.unsubscribe = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    const videoId = req.params.id;

    const video = await Video.findById(videoId).populate(
      "user",
      "_id userName"
    );

    if (!video) {
      return res.status(404).json({ message: "video doesnt exist" });
    }
    if (!user) {
      return res.status(404).json({ message: "user doesnt exist" });
    }

    const videoUserId = video.user._id;

    if (videoUserId == userId) {
      return res
        .status(400)
        .json({ message: "you cannot subscribe to yourself" });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { subscribedTo: videoUserId },
    });

    await User.findByIdAndUpdate(videoUserId, {
      $pull: { subscribers: userId },
    });

    return res.status(200).json({ message: "unsubsribed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json("error");
  }
};

exports.profileSubscribe = async (req, res) => {
  try {
    const userId = req.user.id;
    const loggedInUser = await User.findById(userId);
    const profileId = req.params.profileId;
    const profileUser = await User.findById(profileId);

    if (!loggedInUser || !profileUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    if (profileId == userId) {
      return res
        .status(400)
        .json({ message: "You cannot subscribe to yourself" });
    }

    await User.findByIdAndUpdate(userId, {
      $addToSet: { subscribedTo: profileId },
    });

    await User.findByIdAndUpdate(profileId, {
      $addToSet: { subscribers: userId },
    });

    return res.status(200).json({ message: "Subscribed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.profileUnsubscribe = async (req, res) => {
  try {
    const userId = req.user.id;
    const loggedInUser = await User.findById(userId);
    const profileId = req.params.profileId;
    const profileUser = await User.findById(profileId);

    if (!loggedInUser || !profileUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    if (profileId == userId) {
      return res
        .status(400)
        .json({ message: "You cannot unsubscribe from yourself" });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { subscribedTo: profileId },
    });

    await User.findByIdAndUpdate(profileId, {
      $pull: { subscribers: userId },
    });

    return res.status(200).json({ message: "Unsubscribed successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const userId = req.user.id;
    const userArray = await User.findById(userId)
      .select("subscribedTo")
      .populate({
        path: "subscribedTo",
        select: "_id userName profilePic subscribers about",
      });

    console.log(userArray);
    return res
      .status(200)
      .json({ message: "data fetched succssfully", userArray });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "server error" });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "server error" });
  }
};
