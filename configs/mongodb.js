import mongoose from "mongoose";
import { config } from "dotenv";
import { join } from "path";

config({ path: join(__dirname, "./.env") });

const handleOpen = () => {
  console.log("✅ Success to connect mongodb");
};
const handleError = (error) => {
  console.log("❌ Error Connection: ", error);
};

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", handleError);
db.once("open", handleOpen);
