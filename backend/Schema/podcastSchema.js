const mongoose = require("mongoose");

const fileStorage = new mongoose.Schema({
  filename: String,
  path: String,
  originalname: String,
});

const PodcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  about: {
    type: String,
    required: true,
  },
  creator: {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,

    },
  },
  views: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  src: fileStorage ,
});
module.exports = mongoose.model("Podcast", PodcastSchema);
