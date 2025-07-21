require("dotenv").config();
const mongoose = require("mongoose");
const dbURL = process.env.DATABASE_URL;
const connectDB = async () => {
  await mongoose.connect(dbURL);
};

module.exports = connectDB;
