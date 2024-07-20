const UserSchema = require("../Schema/user");

// Controller to add a podcast to user's favorites
const addFavoritePodcast = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const podcastId = req.body.podcastId; // Assuming podcastId is coming from request body

        // Update user document by pushing the podcastId to favorites array
        const user = await UserSchema.findByIdAndUpdate(
            userId,
            { $push: { favorites: podcastId } },
            { new: true } // To return the updated document
        );

        res.status(200).json({ message: "Favorite podcast added", user });
    } catch (error) {
        next(error);
    }
}

// Controller to add a podcast to user's uploads
const addUploadedPodcast = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const podcastId = req.body.podcastId; // Assuming podcastId is coming from request body

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
}

module.exports = {
    addFavoritePodcast,
    addUploadedPodcast
};
