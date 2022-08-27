const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");

const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "./configs/.env") });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routers
const userRouter = require("./routes/users");
const projectRouter = require("./routes/projects");
const projectReqRouter = require("./routes/projectRequests");

app.use("/user", userRouter);
app.use("/prj", projectRouter);
app.use("/prj/req", projectReqRouter);

// use mongodb connector
const conn = require("./configs/mongodb");

const PORT = process.env.PORT;
http.createServer(app).listen(PORT, () => {
  console.log(`The Server started port ${PORT} ...`);
});
