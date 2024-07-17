const router = require("express").Router();
const multer = require("multer");
const uploadSchema = require("../Schema/upload");
const path=require("path")
const {addPodcast,getPodcasts,getPodcast}=require("../controllers/podcast")

const uploadDir = path.join(__dirname, '../uploads');
console.log(uploadDir)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/uploads", upload.single("file"), async (req, res, next) => {
  try {
    if(!req.file){
    
      return res.status(500).json({message:"no file found",req})
    }
    console.log(req.file);
    const { filename, path, originalname } = req.file;
    const data = new uploadSchema({
      filename: filename,
      path: path,
      originalname: originalname,
    });
    await data.save();
    res.status(200).json({ message: "The file has been stored" });
  } catch (error) {
    next(error);
  }
});

router.post("/",addPodcast)
router.get("/",getPodcasts)
module.exports = router;
