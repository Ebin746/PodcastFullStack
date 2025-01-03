
const fileUpload =async (req, res, next) => {
    try {
      if(!req.file){ 
        return res.status(500).json({message:"no file found",req})
      }
      console.log(req.file);
      const { filename, path, originalname } = req.file;
      const audioData ={
        filename: filename,
        path: path,
        originalname: originalname,
      };
      req.audioData=audioData;
    next();
    } catch (error) {
      next(error);
    }
  }


  const imageFileUpload=async (req,res,next)=>{
try {
  if(!req.file){
    return res.status(500).json({message:"no file found",req});
  }
  const {filename, path, originalname}=req.file;
  
  const imageData={
    filename,path,originalname
  }
  req.imageData=imageData;
  next();
} catch (error) {
  next(error);
}
  }
  module.exports={fileUpload,imageFileUpload}