const uploadSchema=require("../Schema/upload")
const fileUpload =async (req, res, next) => {
    try {
      if(!req.file){ 
        return res.status(500).json({message:"no file found",req})
      }
      console.log(req.file);
      const { filename, path, originalname } = req.file;
      const data = new uploadSchema({
        filename: filename,
        path: path,
        originalname: originalname,
      });
      await data.save();
      res.status(200).json({ message: "The file has been stored" });
    } catch (error) {
      next(error);
    }
  }
  module.exports={fileUpload}