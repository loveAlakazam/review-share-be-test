import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  sns: { type: String, enum: ["NaverBlog", "Instagram"] },
  requestUserList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Projects = mongoose.model("projects", projectSchema);
export default Projects;
