const { Comment } = require("../models/comment");

exports.addComment = async (req, res) => {
  try {
    let { video, message } = req.body;

    const comment = await new Comment({
      user: req.user.id,
      video,
      message,
    }).populate("user", "userName about profilePic");

    await comment.save();

    return res.status(200).json({ success: true, comment });
  } catch (err) {
    return res.status(500).json({ error: "server error" });
  }
};

exports.getCommentByVideoId = async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await Comment.find({ video: videoId }).populate(
      "user",
      "userName about profilePic"
    );

    return res.status(200).json({ success: true, comments });
  } catch (err) {
    return res.status(500).json({ error: "server error" });
  }
};
