const UserSchema = require("../Schema/user");

// Controller to add a podcast to user's favorites
const addFavoritePodcast = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const podcastId = req.params.podcastId;
        if(!userId||!podcastId) return res.status(400).json({message:`params missing`})
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
    let userId = req.params.userId;
    try {
        const user = await UserSchema.findById(userId).populate('favarates');
        res.status(200).json(user. favarates);
    } catch (error) {
        next(error);
    }
};

// Controller to delete a podcast from user's favorites
const deleteFavoritePodcast = async (req, res, next) => {
    let userId = req.params.userId;
    let podcastId = req.params.podcastId;
    try {
        console.log(userId)
        await UserSchema.updateOne(
            { _id: userId }, 
            { $pull: {favarates: podcastId } }
        );
        res.status(200).json({ message: "Removed the favorite podcast" });
    } catch (error) {
        next(error);
    }
};

// Controller to add a podcast to user's uploads
const addUploadedPodcast = async (req, res, next) => {
    try {
        const userId = req.params.id;
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
