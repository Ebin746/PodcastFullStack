const cloudinary = require("cloudinary").v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,        
  api_key: process.env.CLOUDINARY_API_ID,         
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,  
});

const fileUpload = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(500).json({ message: "No file found" });
    }
    console.log("Received file: ", req.file);

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },  
      (error, response) => {
        if (error) {
          return next(error);  
        }
        const audioData = {
          url: response.secure_url,
          public_id: response.public_id,
          format: response.format,
        };
         console.log(audioData);
        req.audioData = audioData; 
        next();
      }
    );

    
    uploadStream.end(req.file.buffer);

  } catch (error) {
    next(error);  
  }
};

module.exports = { fileUpload };
