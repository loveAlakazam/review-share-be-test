import express from "express";
import { join } from "path";
import { urlencoded, json } from "body-parser";
import { createServer } from "http";
import { config } from "dotenv";
import morgan from "morgan";

import userRouter from "./routes/users";
import projectRouter from "./routes/projects";
import projectReqRouter from "./routes/projectRequests";

import conn from "./configs/mongodb";

// app
const app = express();

// middleware
const logger = morgan("dev");
app.use(logger);

// use dotenv(.env)
config({ path: join(__dirname, "./configs/.env") });

app.use(urlencoded({ extended: false }));
app.use(json());

// routers
app.use("/user", userRouter);
app.use("/prj", projectRouter);
app.use("/req", projectReqRouter);

// run server
const PORT = process.env.PORT;
createServer(app).listen(PORT, () => {
  console.log(`The Server started port ${PORT} ...`);
});
