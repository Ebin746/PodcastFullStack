const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const {
  addFavoritePodcast,
  getAllFavoritePodcast,
  deleteFavoritePodcast,
  addUploadedPodcast,
} = require("../controllers/user");
const {verifyToken}=require("../middlewares/jwtVerify.middleware");
router.post("/:id/:podcastId", verifyToken,addUploadedPodcast);
router.get("/fav/:userId",getAllFavoritePodcast);
router.delete("/fav/:userId/:podcastId",deleteFavoritePodcast);
router.post("/fav/:userId/:podcastId", addFavoritePodcast);

module.exports = router;
