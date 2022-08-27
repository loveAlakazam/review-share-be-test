const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectRequestSchema = {
  user: { type: Schema.Types.ObjectId, ref: "User" },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  message: String,
  createdAt: { type: Date, default: Date.now },
};

const ProjectRequests = mongoose.model("projectrequests", projectRequestSchema);
module.exports = { ProjectRequests };
