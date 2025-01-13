const multer = require("multer");

// Remove local storage setup as we're uploading directly to Cloudinary
const storage = multer.memoryStorage();  // Store files in memory
const upload = multer({ storage: storage, 
  fileFilter: (req, file, cb) => {
    if(file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb(new Error("Only audio files can be uploaded"), false);
    }
  }
});

module.exports = { upload };
