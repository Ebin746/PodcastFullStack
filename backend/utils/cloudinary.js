const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,        // Fix this line
  api_key: process.env.CLOUDINARY_API_ID,         // Fix this line
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,  // Fix this line
});

const uploadOnCloudnary = async (localfilePath) => {
  try {
    if (!localfilePath) return null;
    const response = await cloudinary.uploader.upload(localfilePath, {
      resource_type: "auto",
    });
    console.log("file uploaded successfully", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localfilePath);
    return null;
  }
};

module.exports = uploadOnCloudnary;
