import mongoose from "mongoose";
import { config } from "dotenv";
import { MONGODB_URI_PROD } from "./prod";
import { MONGODB_URI_DEV } from "./dev";
config({ path: join(__dirname, "./.env") });

const handleOpen = () => {
  console.log("✅ Success to connect mongodb");
};
const handleError = (error) => {
  console.log("❌ Error Connection: ", error);
};

let MONGODB_URI = MONGODB_URI_PROD;
if (process.env.NODE_ENV === "dev") {
  MONGODB_URI = MONGODB_URI_DEV;
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", handleError);
db.once("open", handleOpen);

export default db;
