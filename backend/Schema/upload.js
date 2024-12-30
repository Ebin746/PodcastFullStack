const mongoose = require("mongoose");

const fileStorage = new mongoose.Schema({
  filename: String,
  path: String,
  originalname: String,
});

module.exports = mongoose.model("audio", fileStorage);
