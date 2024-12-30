const { json } = require("express");
const { options } = require("../routers/user");
const CategorySchema = require("../Schema/categorySchema");
const PodcastSchema = require("../Schema/podcastSchema");

const addPodcast = async (req, res, next) => {
  let categoryData;
  try {
    const { name } = req.body;
    const podcast = JSON.parse(req.body.podcast);
    const { title, about, creator, views, imageUrl } = podcast;

    const { filename, path, originalname } = req.audioData;
    console.log(name, podcast, "frome here");
    let podcastData = await new PodcastSchema({
      title,
      about,
      creator: {
        name: creator.name,
        avatar: creator.avatar,
      },
      views,
      imageUrl,
      src: { filename, path, originalname },
    }).save();
    try {
      categoryData = await CategorySchema.findOne({ name });
      if (!categoryData) {
        categoryData = new CategorySchema({
          name: name,
          podcasts: [podcastData._id],
        });
      } else {
        categoryData.podcasts.push(podcastData._id);
      }
      await categoryData.save();
    } catch (error) {
      next(error);
    }
    res
      .status(200)
      .json({ message: "the podcast added successfully", categoryData });
  } catch (error) {
    next(error);
  }
};
const getPodcasts = async (req, res, next) => {
  try {
    let data = await CategorySchema.find().populate("podcasts").exec();

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
  console.log(query);
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

  // Ensure the query parameter is provided
  console.log(query);
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
