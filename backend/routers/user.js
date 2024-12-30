const router = require("express").Router();
const {
  addFavoritePodcast,
  getAllFavoritePodcast,
  deleteFavoritePodcast,
  addUploadedPodcast,
} = require("../controllers/user");


const {authenticationVerify}=require("../middlewares/jwtVerify.middleware");
router.post("/:id/:podcastId",authenticationVerify ,addUploadedPodcast);
router.get("/fav/:userId",authenticationVerify,getAllFavoritePodcast);
router.delete("/fav/:userId/:podcastId",authenticationVerify,deleteFavoritePodcast);
router.post("/fav/:userId/:podcastId", authenticationVerify,addFavoritePodcast);

module.exports = router;
