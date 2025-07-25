require("dotenv").config();
const { Video } = require("../models/video");
const { User } = require("../models/user");
const ffprobePath = require("ffprobe-static").path;
const { spawn } = require("child_process");

exports.videoUpload = async (req, res) => {
  try {
    console.log("received video uploads 0");
    const { title, description, category, thumbnail, videoLink } = req.body;
    console.log("received video uploads 1");
    const reqUser = req.user;

    console.log("received video uploads 2");
    const testUrl =
      req.body.videoLink ||
      "https://res.cloudinary.com/yourcloud/video/upload/sample.mp4";
    console.log("received video uplload 3");
    //to get video duration

    console.log("before ffbrobe");
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
          console.error(`ffprobe error: ${err.toString()}`);
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

    console.log("after ffprobe");
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

    console.log("before duration in seconds");
    try {
      const durationInSeconds = await getVideoDuration(testUrl);
      const videoDuration = await formatDuration(durationInSeconds);
    } catch (error) {
      console.error("Error while getting video duration:", error);
      return res
        .status(500)
        .json({ error: "Failed to get video duration", detail: error.message });
    }

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
      "_id userName about profilePic subscribers subscribedTo"
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
      "_id userName about profilePic subscribers subscribedTo"
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
      "_id userName about profilePic"
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

exports.toggleLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const videoId = req.params.id;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    let liked = false;

    if (video.likedBy.includes(userId)) {
      // If already liked, remove like
      await Video.findByIdAndUpdate(videoId, {
        $inc: { like: -1 },
        $pull: { likedBy: userId },
      });

      await User.findByIdAndUpdate(userId, {
        $pull: { likedVideos: videoId },
      });

      liked = false;
    } else {
      const updateOps = {
        $inc: { like: 1 },
        $addToSet: { likedBy: userId },
      };

      // If disliked before, remove dislike
      if (video.dislikedBy.includes(userId)) {
        updateOps.$inc.dislike = -1;
        updateOps.$pull = { dislikedBy: userId };
      }

      await Video.findByIdAndUpdate(videoId, updateOps);

      await User.findByIdAndUpdate(userId, {
        $addToSet: { likedVideos: videoId },
      });

      liked = true;
    }

    const updatedVideo = await Video.findById(videoId);

    return res.status(200).json({
      message: liked ? "Video Liked" : "Like Removed",
      likes: updatedVideo.like,
      dislikes: updatedVideo.dislike,
      likedBy: updatedVideo.likedBy,
      dislikedBy: updatedVideo.dislikedBy,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.toggleDislike = async (req, res) => {
  try {
    const userId = req.user.id;
    const videoId = req.params.id;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    let disliked = false;

    if (video.dislikedBy.includes(userId)) {
      // If already disliked, remove dislike
      await Video.findByIdAndUpdate(videoId, {
        $inc: { dislike: -1 },
        $pull: { dislikedBy: userId },
      });
      disliked = false;
    } else {
      const updateOps = {
        $inc: { dislike: 1 },
        $addToSet: { dislikedBy: userId },
      };

      // If liked before, remove like
      if (video.likedBy.includes(userId)) {
        updateOps.$inc.like = -1;
        updateOps.$pull = { ...updateOps.$pull, likedBy: userId };
        await User.findByIdAndUpdate(userId, {
          $pull: { likedVideos: videoId },
        });
      }

      await Video.findByIdAndUpdate(videoId, updateOps);
      disliked = true;
    }

    const updatedVideo = await Video.findById(videoId);

    return res.status(200).json({
      message: disliked ? "Video Disliked" : "Dislike Removed",
      likes: updatedVideo.like,
      dislikes: updatedVideo.dislike,
      likedBy: updatedVideo.likedBy,
      dislikedBy: updatedVideo.dislikedBy,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getLikedVideos = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate({
      path: "likedVideos",
      populate: { path: "user", select: "userName profilePic" },
    });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    return res.status(200).json(user.likedVideos);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "server error" });
  }
};

exports.getSuggestedVideos = async (req, res) => {
  try {
    const videoId = req.params.id;

    const videos = await Video.find({
      _id: { $ne: videoId },
    })
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("user", "_id userName profilePic ");

    if (!videos) {
      return res.status(404).json({ message: "video doesnt exist" });
    }

    return res.status(200).json({ videos: videos });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "server error" });
  }
};

exports.videosSearch = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: "query parameter q is required" });
  }

  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).populate("user", "_id userName profilePic");

    if (videos.length === 0) {
      res.status(404).json({ message: "videos doesnt exist" });
    }

    return res.status(200).json(videos);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};
