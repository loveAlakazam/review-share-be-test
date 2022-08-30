import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  sns: { type: String, enum: ["NaverBlog", "Instagram"] },
  requestUserList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// 프로젝트 생성

// 프로젝트 수정

// 프로젝트 삭제

// 프로젝트에 요청한 유저가 들어있는지 확인

const Projects = mongoose.model("projects", projectSchema);
export default Projects;
