require("dotenv").config()
const express=require("express");
const app=express();
const dataBaseConnection=require("./DataBase/dataBase");
const podcastRouter=require("./routers/podcast");
const cors=require("cors");
const fs=require("fs");
const path=require("path");



const uploadDir=path.join(__dirname,"./uploads");
if(!fs.existsSync(uploadDir)){
fs.mkdirSync(uploadDir)
}

app.use(cors());
app.use(express.json())
app.use("/api",podcastRouter);

app.use((error,req,res,next)=>{
let ErrorStatus=error.status||500;
let ErrorMessage=error.message||"some errors are detected";
res.json({
 status:ErrorStatus,
 message:ErrorMessage,
 success:false,
 stack:error.stack
})
})

const PORT=3000||process.env.PORT;
app.listen(PORT,()=>{
    dataBaseConnection();
console.log("server started",PORT);
})