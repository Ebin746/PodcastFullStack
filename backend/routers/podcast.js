const router = require("express").Router();
const uploadSchema = require("../Schema/upload");
const {
  addPodcast,
  getPodcasts,
  getPodcast,
} = require("../controllers/podcast");
const { upload } = require("../middlewares/multer.middleware");

router.post("/uploads", upload.single("file"), fileUpload);

router.post("/", addPodcast);
router.get("/", getPodcasts);
router.get("/:id", getPodcast);
router.delete("/:podcastId/:categoryId");
router.put("/:id");
module.exports = router;
