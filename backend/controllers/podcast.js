
const CategorySchema = require("../Schema/categorySchema");
const PodcastSchema = require("../Schema/podcastSchema");
const UserSchema=require("../Schema/user");

const addPodcast = async (req, res, next) => {

  try {
   
    const userId = req.user;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized or userId missing" });
    }

    const { name } = req.body;
    const podcast = JSON.parse(req.body.podcast);

    if (!name || !podcast || !req.audioData) {
      return res.status(400).json({ error: "Missing required data" });
    }

    const { title, about, creator, views, imageUrl } = podcast;
    const {url}= req.audioData;

    // Save new podcast
    const podcastData = await new PodcastSchema({
      title,
      about,
      creator: {
        name: creator.name,
        avatar: creator.avatar,
      },
      views,
      imageUrl,
      src: url,
    }).save();

    // Find or create category and add podcast ID
    let categoryData = await CategorySchema.findOne({ name });
    if (!categoryData) {
      categoryData = new CategorySchema({
        name,
        podcasts: [podcastData._id],
      });
    } else {
      categoryData.podcasts.push(podcastData._id);
    }
    await categoryData.save();

    // Update user's uploads with the new podcast ID
    const user = await UserSchema.findByIdAndUpdate(
      userId,
      { $addToSet: { uploads: podcastData._id } },
      { new: true }
    );
    console.log("user",user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Podcast added successfully" });
  } catch (error) {
    console.error("Error adding podcast:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getPodcasts = async (req, res, next) => {
  try {
    let data = await CategorySchema.find().populate('podcasts').exec();

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
const getPodcast = async (req, res, next) => {
  try {
    const id = req.params.id;
    let data = await PodcastSchema.findById(id);
    if (!data) {
      res.status(404).json({ message: "podcast Not Found" });
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
const deletePodcast = async (req, res, next) => {
  try {
    let { podcastId, categoryId } = req.params.id;
    let data = await PodcastSchema.findOneAndDelete(podcastId);
    await CategorySchema.findByIdAndUpdate(categoryId, {
      $pull: { podcasts: podcastId },
    });
    res.status(200).json({ message: "The podcast has been deleted ", data });
  } catch (error) {
    next(error);
  }
};
const updatePodcast = async (req, res, next) => {
  try {
    let id = req.params.id;
    const { title, about, creator, views, imageUrl } = req.body;
    let data = await PodcastSchema.findByIdAndUpdate({
      title,
      about,
      creator,
      views,
      imageUrl,
    }).save();
    res.status(200).json({ message: "the podcast updated", data });
  } catch (error) {
    next(error);
  }
};
const querySearch = async (req, res, next) => {
  const { query, page = 1, limit = 10 } = req.query;

  try {
    const result = await PodcastSchema.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { about: { $regex: query, $options: "i" } },
      ],
    })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const suggestions = async (req, res, next) => {
  const { query, page = 1, limit = 10 } = req.query;


  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    // Search podcasts by title or about fields using regex
    const searchQuery = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { about: { $regex: query, $options: "i" } },
      ],
    };

    // Count total results for pagination
    const totalResults = await PodcastSchema.countDocuments(searchQuery);

    // Find matching podcasts with pagination
    const results = await PodcastSchema.find(searchQuery)
      .select("title")
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .lean(); // Lean query for performance

    // Return results along with pagination metadata
    res.status(200).json({
      results,
      totalResults,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalResults / limit),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addPodcast,
  getPodcasts,
  getPodcast,
  deletePodcast,
  updatePodcast,
  querySearch,
  suggestions,
};
