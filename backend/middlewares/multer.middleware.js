const multer = require("multer");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads");
console.log(uploadDir);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
