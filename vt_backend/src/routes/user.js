const express = require("express");
const authRouter = express.Router();
const userController = require("../controllers/user");
const userAuth = require("../middleware/auth");

authRouter.post("/signup", userController.signUp);
authRouter.post("/login", userController.logIn);
authRouter.post("/logout", userController.logOut);

authRouter.post("/users/subscribe/:id", userAuth, userController.subscribe);
authRouter.post("/users/unsubscribe/:id", userAuth, userController.unsubscribe);

authRouter.post(
  "/users/subscribe/profile/:profileId",
  userAuth,
  userController.profileSubscribe
);
authRouter.post(
  "/users/unsubscribe/profile/:profileId",
  userAuth,
  userController.profileUnsubscribe
);

authRouter.get("/users/getprofiles", userAuth, userController.getProfiles);

authRouter.get("/user/:id", userController.getUserData);

module.exports = authRouter;

// /auth
