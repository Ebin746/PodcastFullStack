const router = require("express").Router();
const {
  addFavoritePodcast,
  addUploadedPodcast,
} = require("../controllers/user");

router.post("/:id/:podcastId", addUploadedPodcast);

router.post("/:id/:podcastId", addFavoritePodcast);

module.exports = router;
