const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = Schema({
  title: String,
  sns: { type: String, enum: ["NaverBlog", "Instagram"] },
  requestUserList: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Projects = mongoose.model("projects", projectSchema);
module.exports = { Projects };
