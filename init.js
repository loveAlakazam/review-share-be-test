// import database & models
import "./configs/mongodb";
import "./models/Users";
import "./models/Projects";
import "./models/ProjectRequests";

import { join } from "path";
import { config } from "dotenv";
import app from "./app";

// use dotenv(.env)
config({ path: join(__dirname, "./configs/.env") });

// run server
const PORT = process.env.PORT;
const runServerHandling = () => {
  console.log(`✅ The Server started port ${PORT} ...`);
};
app.listen(PORT, runServerHandling);
