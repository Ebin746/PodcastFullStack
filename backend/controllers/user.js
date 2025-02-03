
const UserSchema = require("../Schema/user");


// Controller to add a podcast to user's favorites
const addFavoritePodcast = async (req, res, next) => {
  try {
    const userId = req.user;
    const podcastId = req.params.podcastId;
    if (!userId || !podcastId)
      return res.status(400).json({ message: `params missing` });
    // Update user document by pushing the podcastId to favorites array
    const user = await UserSchema.findByIdAndUpdate(
      userId,
      { $push: { favarates: podcastId } },
      { new: true } // To return the updated document
    );

    res.status(200).json({ message: "Favorite podcast added", user });
  } catch (error) {
    next(error);
  }
};

// Controller to get all favorite podcasts
const getAllFavoritePodcast = async (req, res, next) => {
  const userId  = req.user;


  // Validate userId
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Find user by ID and populate the favorite podcasts (favarates)
    const user = await UserSchema.findById(userId).populate("favarates");

    // If the user does not exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If no favorite podcasts are available
    if (user.favarates.length === 0) {
      return res.status(200).json({ message: "No favorite podcasts found" });
    }

    // Respond with the user's favorite podcasts
    return res.status(200).json(user.favarates);
  } catch (error) {
    next(error);
  }
};


// Controller to delete a podcast from user's favorites
const deleteFavoritePodcast = async (req, res, next) => {
  let userId = req.user;
  let podcastId = req.params.podcastId;
  try {

    await UserSchema.updateOne(
      { _id: userId },
      { $pull: { favarates: podcastId } }
    );
    res.status(200).json({ message: "Removed the favorite podcast" });
  } catch (error) {
    next(error);
  }
};

// Controller to add a podcast to user's uploads
const addUploadedPodcast = async (req, res, next) => {
  try {
    const userId = req.user;
    const podcastId = req.params.podcastId; // Assuming podcastId is coming from request body

    // Update user document by pushing the podcastId to uploads array
    const user = await UserSchema.findByIdAndUpdate(
      userId,
      { $push: { uploads: podcastId } },
      { new: true } // To return the updated document
    );

    res.status(200).json({ message: "Uploaded podcast added", user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addFavoritePodcast,
  getAllFavoritePodcast,
  deleteFavoritePodcast,
  addUploadedPodcast,
};
