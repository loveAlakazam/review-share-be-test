import mongoose from "mongoose";
import Users from "./Users";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sns: { type: String, enum: ["NaverBlog", "Instagram"], required: true },
  requestUserList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Projects = mongoose.model("Project", projectSchema, "projects");
export default Projects;
