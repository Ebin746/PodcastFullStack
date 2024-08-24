const router = require("express").Router();
const{ fileUpload}=require("../controllers/multer");
const {
  addPodcast,
  getPodcasts,
  getPodcast,
} = require("../controllers/podcast");
const { verifyToken } = require("../middlewares/jwtVerify.middleware");
const { upload } = require("../middlewares/multer.middleware");

router.post("/uploads", upload.single("file"), fileUpload);

router.post("/",addPodcast);
router.get("/", getPodcasts);
router.get("/:id", getPodcast);
router.delete("/:podcastId/:categoryId");
router.put("/:id");
module.exports = router;
