import mongoose from "mongoose";

const projectRequestSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ProjectRequests = mongoose.model("projectrequests", projectRequestSchema);
export default ProjectRequests;
