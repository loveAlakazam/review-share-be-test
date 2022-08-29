import express from "express";
import { join } from "path";
import { urlencoded, json } from "body-parser";
import { createServer } from "http";
import { config } from "dotenv";

// Routers
import userRouter from "./routes/users";
import projectRouter from "./routes/projects";
import projectReqRouter from "./routes/projectRequests";

// use mongodb connector
import conn from "./configs/mongodb";

const PORT = process.env.PORT;
const app = express();

config({ path: join(__dirname, "./configs/.env") });

app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/user", userRouter);
app.use("/prj", projectRouter);
app.use("/req", projectReqRouter);

createServer(app).listen(PORT, () => {
  console.log(`The Server started port ${PORT} ...`);
});
