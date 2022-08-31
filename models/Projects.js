import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  sns: { type: String, enum: ["NaverBlog", "Instagram"], required: true },
  requestUserList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Projects = mongoose.model("projects", projectSchema);
export default Projects;
