const mongoose = require("mongoose");



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
  src: {
    type:String
  } 
});
module.exports = mongoose.model("Podcast", PodcastSchema);
