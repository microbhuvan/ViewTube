const express = require("express");
const authRouter = express.Router();
const userController = require("../controllers/user");
const userAuth = require("../middleware/auth");

authRouter.post("/signup", userController.signUp);
authRouter.post("/login", userController.logIn);
authRouter.post("/logout", userController.logOut);

authRouter.post(
  "/users/subscribe/:videoId",
  userAuth,
  userController.subscribe
);
authRouter.post(
  "/users/unsubscribe/:videoId",
  userAuth,
  userController.unsubscribe
);

module.exports = authRouter;

// /auth
