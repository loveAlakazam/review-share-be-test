import mongoose from "mongoose";
import { MONGODB_URI_DEV } from "./dev";

const handleOpen = () => {
  console.log("✅ Success to connect mongodb");
};
const handleError = (error) => {
  console.log("❌ Error Connection: ", error);
};

let MONGODB_URI = process.env.MONGODB_URI;
if (process.env.NODE_ENV === "development") {
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
