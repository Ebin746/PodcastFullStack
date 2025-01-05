const router = require("express").Router();
const {
  addFavoritePodcast,
  getAllFavoritePodcast,
  deleteFavoritePodcast,
  addUploadedPodcast,
} = require("../controllers/user");


const {authenticationVerify}=require("../middlewares/jwtVerify.middleware");
router.post("/:podcastId",authenticationVerify ,addUploadedPodcast);
router.get("/fav/",authenticationVerify,getAllFavoritePodcast);
router.delete("/fav/:podcastId",authenticationVerify,deleteFavoritePodcast);
router.post("/fav/:podcastId", authenticationVerify,addFavoritePodcast);

module.exports = router;
