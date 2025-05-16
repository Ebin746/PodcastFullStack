const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true, // ✅ Correct spelling
  },
  email: {
    type: String,
    required: true, // ✅ Correct spelling
    unique: true,
  },
  password: {
    type: String,
    required: true, // ✅ Correct spelling
  },

  // ✅ Rename 'favarates' to 'favorites' (correct spelling)
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Podcast",
    default: [],
    required:false
  },

  uploads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Podcast",
    },
  ],

  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
