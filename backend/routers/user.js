const router = require("express").Router();
const {
  addFavoritePodcast,
  addUploadedPodcast,
} = require("../controllers/user");

router.post("/:id/:podcastId", addFavoritePodcast);
router.post("/:id/:podcastId", addUploadedPodcast);

module.exports = router;
