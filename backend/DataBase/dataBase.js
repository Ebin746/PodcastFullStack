
require("dotenv").config();// const mongoose = require("mongoose");

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

const URL =process.env.DATABASE_URL
console.log("url",URL)
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
