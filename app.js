import express from "express";
import { urlencoded, json } from "body-parser";
import morgan from "morgan";

import userRouter from "./routes/users";
import projectRouter from "./routes/projects";
import projectReqRouter from "./routes/projectRequests";

// app
const app = express();

// middleware
const logger = morgan("dev");
app.use(logger);

app.use(urlencoded({ extended: false }));
app.use(json());

// routers
app.use("/users", userRouter);
app.use("/prjs", projectRouter);
app.use("/reqs", projectReqRouter);

export default app;
