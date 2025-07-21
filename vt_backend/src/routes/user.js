const express = require("express");
const authRouter = express.Router();
const userController = require("../controllers/user");

authRouter.post("/signup", userController.signUp);
authRouter.post("/login", userController.logIn);

module.exports = authRouter;
