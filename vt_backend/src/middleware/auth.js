const JWT = require("jsonwebtoken");
const { User } = require("../models/user");
require("dotenv").config();

const userAuth = async (req, res, next) => {
  console.log("entering userAuth");

  const token = req.cookies.token;
  console.log("token", token);

  if (!token) {
    return res.status(401).json({ error: "authorization error" });
  } else {
    try {
      const userId = await JWT.verify(token, process.env.JWT_SECRET);

      console.log("userId", userId);

      const { id } = userId;

      console.log("id", id);

      const user = await User.findById(id);

      console.log("user", user);

      if (!user) {
        return res.status(400).json({ error: "user not found" });
      }

      req.user = user;
      console.log("exiting auth");
      next();
    } catch (err) {
      return res.status(500).json({ error: "server error" });
    }
  }
};

module.exports = userAuth;
