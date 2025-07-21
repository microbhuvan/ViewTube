const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  try {
    const { userName, password, emailId, about, profilePic } = req.body;
    const isExist = await User.findOne({ userName: userName });

    if (isExist) {
      return res
        .status(400)
        .json({ error: "username already exist please try another username" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        userName,
        password: hashedPassword,
        emailId,
        about,
        profilePic,
      });

      await user.save();
      return res
        .status(201)
        .json({ message: "user registered successfully", success: "true" });
    }
  } catch (err) {
    return res.status(500).json({ error: "server error" });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const logInUser = await User.findOne({ userName });
    if (logInUser) {
      const logInUserPassword = logInUser.password;
      const isMatch = await bcrypt.compare(password, logInUserPassword);
      if (isMatch) {
        return res
          .status(200)
          .json({ message: "logged in successfully", success: "yes" });
      } else {
        return res.status(401).json({ error: "invalid credentials" });
      }
    } else {
      return res.status(400).json({ error: "user doesnt exist" });
    }
  } catch (err) {
    return res.status(500).json({ error: "server error" });
  }
};
