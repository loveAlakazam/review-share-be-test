import "dotenv/config";

// import database & models
import "./configs/mongodb.js";
import "./models/Users.js";
import "./models/Projects.js";
import "./models/ProjectRequests.js";
import app from "./app.js";

// run server
let PORT = 6500;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  PORT = process.env.PORT;
}
const runServerHandling = () => {
  console.log(`✅ The Server started port ${PORT} ...`);
};
app.listen(PORT, runServerHandling);
