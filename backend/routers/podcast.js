const router = require("express").Router();
const{ fileUpload,imageFileUpload}=require("../controllers/multer");
const {
  addPodcast,
  getPodcasts,
  getPodcast,
  deletePodcast,
  updatePodcast,
  querySearch,
  suggestions
} = require("../controllers/podcast");
const { authenticationVerify } = require("../middlewares/jwtVerify.middleware");
const { upload } = require("../middlewares/multer.middleware");
const {Imageupload}=require("../middlewares/imageMulter.middleware")

router.post("/uploads", authenticationVerify,upload.single("file"),fileUpload, addPodcast);
router.get("/search",querySearch);
router.get("/suggestions",suggestions)
router.post("/",authenticationVerify,addPodcast);
router.get("/", getPodcasts);
router.get("/:id", getPodcast);
router.delete("/:podcastId/:categoryId");
router.put("/:id");

module.exports = router;
