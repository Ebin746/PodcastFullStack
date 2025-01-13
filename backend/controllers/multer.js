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

    // Upload the file buffer directly to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },  // Automatically detect file type
      (error, response) => {
        if (error) {
          return next(error);  // Pass error to the next error handler
        }

        // Store the Cloudinary file details in the request object
        const audioData = {
          url: response.secure_url,
          public_id: response.public_id,
          format: response.format,
        };
         console.log(audioData);
        req.audioData = audioData;  // Attach file data to the request object

        // Proceed to the next middleware only after the upload is complete
        next();
      }
    );

    // Upload the file buffer to Cloudinary directly
    uploadStream.end(req.file.buffer);

  } catch (error) {
    next(error);  // If any error occurs, pass it to the next error handler
  }
};

module.exports = { fileUpload };
