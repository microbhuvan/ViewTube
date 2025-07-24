require("dotenv").config();
const { Video } = require("../models/video");
const { User } = require("../models/user");
const ffprobePath = require("ffprobe-static").path;
const { spawn } = require("child_process");

exports.videoUpload = async (req, res) => {
  try {
    const { title, description, category, thumbnail, videoLink } = req.body;
    const reqUser = req.user;

    //to get video duration
    function getVideoDuration(filePath) {
      return new Promise((resolve, reject) => {
        const ffprobe = spawn(ffprobePath, [
          "-v",
          "error",
          "-show_entries",
          "format=duration",
          "-of",
          "json",
          filePath,
        ]);

        let data = "";
        ffprobe.stdout.on("data", (chunk) => {
          data += chunk;
        });

        ffprobe.stderr.on("data", (err) => {
          console.error(`ffprobe error: ${err}`);
        });

        ffprobe.on("close", (code) => {
          if (code !== 0) {
            reject(new Error(`ffprobe exited with code ${code}`));
          } else {
            const parsed = JSON.parse(data);
            resolve(parseFloat(parsed.format.duration));
          }
        });
      });
    }

    function formatDuration(seconds) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);

      if (h > 0) {
        return `${h}:${m.toString().padStart(2, "0")}:${s
          .toString()
          .padStart(2, "0")}}`;
      } else {
        return `${m}:${s.toString().padStart(2, "0")}`;
      }
    }

    const durationInSeconds = await getVideoDuration(videoLink);
    const videoDuration = await formatDuration(durationInSeconds);

    const video = new Video({
      user: reqUser.id,
      title,
      description,
      category,
      thumbnail,
      videoLink,
      videoLength: videoDuration,
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

exports.incrementViews = async (req, res) => {
  try {
    const videoId = req.params.id;

    const video = await Video.findByIdAndUpdate(
      videoId,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: "video not found" });
    }

    return res
      .status(200)
      .json({ message: "value updated successfully", views: video.views });
  } catch (err) {
    return res.status(500).json({ message: "server errror", err });
  }
};
