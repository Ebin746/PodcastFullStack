const mongoose=require("mongoose");


const PodcastSchema= new mongoose.Schema({

    title: {
      type: String,
      required: true
    },
    about: {
      type: String,
      required: true
    },
    creator: {
      name: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        required: true
      }
    },
    views: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
  
})
module.exports=mongoose.model('Podcast',PodcastSchema);

