const express = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/comment");
const userAuth = require("../middleware/auth");

commentRouter.post("/comment", userAuth, commentController.addComment);
commentRouter.get("/comment/:videoId", commentController.getCommentByVideoId);

module.exports = commentRouter;
