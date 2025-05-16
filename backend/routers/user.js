const router = require("express").Router();
const {
  getUserProfileWithUploads,
  addFavoritePodcast,
  getAllFavoritePodcast,
  deleteFavoritePodcast,
  addUploadedPodcast,
} = require("../controllers/user");

const { authenticationVerify } = require("../middlewares/jwtVerify.middleware");

router.post("/:podcastId", authenticationVerify, addUploadedPodcast);
router.get("/fav/", authenticationVerify, getAllFavoritePodcast);
router.delete("/fav/:podcastId", authenticationVerify, deleteFavoritePodcast);
router.post("/fav/:podcastId", authenticationVerify, addFavoritePodcast);
router.get("/profile", authenticationVerify, getUserProfileWithUploads);
module.exports = router;
