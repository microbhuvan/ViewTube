const express = require("express");
const app = express();
const PORT = 5000;
const connectDB = require("./config/database");
const authRouter = require("./routes/user");

app.use(express.json());

app.use("/auth", authRouter);

connectDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(PORT, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log("couldnt connect to database ");
  });
