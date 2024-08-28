const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, require: true },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: { type: String, require: true },
  favarates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Podcast",
    },
  ],
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
