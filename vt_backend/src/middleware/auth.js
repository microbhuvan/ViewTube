const JWT = require("jsonwebtoken");
const { User } = require("../models/user");
require("dotenv").config();

const userAuth = async (req, res, next) => {
  console.log("entering userAuth");

  const token = req.cookies.token;

  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "authorization error" });
  } else {
    try {
      const userId = await JWT.verify(token, process.env.JWT_SECRET);
      const { id } = userId;

      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({ error: "user not found" });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(500).json({ error: "server error" });
    }
  }
};

module.exports = userAuth;
