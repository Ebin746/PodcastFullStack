const multer = require("multer");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage,
  fileFilter:(req,file,cb)=>{
  if(file.mimetype.startsWith("audio/")){
    cb(null,true);
  }
  else{
    cb(new Error("only audio files can store",false));
  }
} 
});
module.exports = { upload };
