const express = require("express");
const videoRouter = express.Router();
const videoController = require("../controllers/video");
const userAuth = require("../middleware/auth");

videoRouter.post("/video", userAuth, videoController.videoUpload);
videoRouter.get("/allvideo", videoController.getAllVideo);
videoRouter.get("/getvideo/:id", videoController.getVideoById);
videoRouter.get("/:userId/getuservideo", videoController.getUserVideo);

videoRouter.put("/increment-views/:id", videoController.incrementViews);
videoRouter.post(
  "/video/:id/toggle-like",
  userAuth,
  videoController.toggleLike
);
videoRouter.post(
  "/video/:id/toggle-dislike",
  userAuth,
  videoController.toggleDislike
);
videoRouter.get("/liked-videos", userAuth, videoController.getLikedVideos);

module.exports = videoRouter;
