// import database & models
import "./configs/mongodb.js";
import "./models/Users.js";
import "./models/Projects.js";
import "./models/ProjectRequests.js";

import { join } from "path";
import { config } from "dotenv";
import app from "./app.js";

config();
// run server
let PORT = 6500;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  // use dotenv(.env)
  PORT = process.env.PORT;
}
const runServerHandling = () => {
  console.log(`✅ The Server started port ${PORT} ...`);
};
app.listen(PORT, runServerHandling);
