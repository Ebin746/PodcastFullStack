const CategorySchema = require("../Schema/categorySchema");
const PodcastSchema = require("../Schema/podcastSchema");

const addPodcast = async (req, res, next) => {
  let categoryData;
  try {
    const { name, podcast } = req.body;
    const { title, about, creator, views, imageUrl } = podcast;
    let podcastData = await new PodcastSchema({
      title,
      about,
      creator: {
        name: creator.name,
        avatar: creator.avatar,
      },
      views,
      imageUrl,
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
module.exports = {
  addPodcast,
  getPodcasts,
  getPodcast,
  deletePodcast,
  updatePodcast,
};
