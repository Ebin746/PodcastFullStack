const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const {
  addFavoritePodcast,
  addUploadedPodcast,
} = require("../controllers/user");
const {verifyToken}=require("../middlewares/jwtVerify.middleware");
router.post("/:id/:podcastId", verifyToken,addUploadedPodcast);

router.post("/:id/:podcastId",verifyToken, addFavoritePodcast);

module.exports = router;
