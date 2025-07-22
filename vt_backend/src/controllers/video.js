require("dotenv").config();
const { Video } = require("../models/video");
const { User } = require("../models/user");

exports.videoUpload = async (req, res) => {
  try {
    const { title, description, category, thumbnail, videoLink } = req.body;
    const reqUser = req.user;

    const video = new Video({
      user: reqUser.id,
      title,
      description,
      category,
      thumbnail,
      videoLink,
    });
    console.log(video);
    await video.save();
    return res.status(200).json({
      message: "video uploaded successfully",
      success: true,
      video: video,
    });
  } catch (err) {
    return res.status(500).json({ error: "server error" });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const video = await Video.findById(id).populate(
      "user",
      "userName about profilePic"
    );

    return res.status(200).json({ success: true, video: video });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};

//get all videos by user
exports.getUserVideo = async (req, res) => {
  try {
    let { userId } = req.params;
    const video = await Video.find({ user: userId }).populate(
      "user",
      "userName about profilePic"
    );

    return res.status(200).json({ success: true, video: video });
  } catch (err) {
    return res.status(500).json({ error: "server error" });
  }
};

exports.getAllVideo = async (req, res) => {
  try {
    const videos = await Video.find().populate(
      "user",
      "userName about profilePic"
    );

    return res.status(200).json({
      message: "video uploaded successfully",
      success: true,
      videos,
    });
  } catch (err) {
    return res.status(500).json({ error: "server error" });
  }
};
