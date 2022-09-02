// import database & models
import "./configs/mongodb.js";
import "./models/Users.js";
import "./models/Projects.js";
import "./models/ProjectRequests.js";

import { join } from "path";
import { config } from "dotenv";
import app from "./app.js";

// use dotenv(.env)
config({ path: join(__dirname, "./configs/.env") });

// run server
const PORT = process.env.PORT;
const runServerHandling = () => {
  console.log(`✅ The Server started port ${PORT} ...`);
};
app.listen(PORT, runServerHandling);
