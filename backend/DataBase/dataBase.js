// const mongoose = require("mongoose");

// const dataBaseConnection = async () => {
//   try {
//     let base = await mongoose.connect("mongodb://localhost:27017/podcast");
//     console.log("database connected");
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = dataBaseConnection;
const mongoose = require("mongoose");
require("dotenv").config();
const URL ="mongodb+srv://ebinamson91:ebin%402004@cluster0.ytopw90.mongodb.net/podcast?retryWrites=true&w=majority&appName=Cluster0"
console.log(URL)
const dataBase = async () => {
  try {
    const base = await mongoose.connect(URL);
    console.log("conneted to the database:", base.connection.port);
  } catch (error) {
    console.log("error:", error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});
module.exports = dataBase;
