const { model } = require("mongoose");
const multer =require("multer");
const path=require("path");

const uploadDir=path.join(__dirname,"../uploadsImage");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const Imageupload=multer({storage:storage,fileFilter:(req,file,cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null,true);
    }
    else{
        cb(new Error("only images can upload"),false)
    }
}})

module.exports={Imageupload}