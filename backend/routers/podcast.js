const router = require("express").Router();
const{ fileUpload}=require("../controllers/multer");
const {
  addPodcast,
  getPodcasts,
  getPodcast,
  deletePodcast,
  updatePodcast,
  querySearch,
  suggestions
} = require("../controllers/podcast");
const { verifyToken } = require("../middlewares/jwtVerify.middleware");
const { upload } = require("../middlewares/multer.middleware");

router.post("/uploads", upload.single("file"), fileUpload);
router.get("/search",querySearch);
router.get("/suggestions",suggestions)
router.post("/",addPodcast);
router.get("/", getPodcasts);
router.get("/:id", getPodcast);
router.delete("/:podcastId/:categoryId");
router.put("/:id");

module.exports = router;
