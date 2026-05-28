require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3005;
const uri = process.env.MONGO_URL;

const app = express();

app.listen(PORT, async () => {
  console.log("App started!");

  try {
    await mongoose.connect(uri);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
});
