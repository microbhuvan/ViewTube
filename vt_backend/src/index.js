require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

// const allowedOrigins = (
//   process.env.FRONTEND_URL || "http://localhost:5173"
// ).split(",");

const allowedOrigins = "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/user");
const videoRouter = require("./routes/video");
const commentRouter = require("./routes/comment");

app.use("/auth", authRouter);
app.use("/api", videoRouter);
app.use("/commentApi", commentRouter);

connectDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(5000, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log("couldnt connect to database ", err);
  });
