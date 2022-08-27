const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
dotenv.config({ path: path.join(__dirname, "./.env") });

const conn = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("review share mongodb connected....");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = conn;
