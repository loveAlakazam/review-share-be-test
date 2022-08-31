import express from "express";
import {
  getProjectInfo,
  createNewProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController";

const router = express.Router();

// 프로젝트 생성
router.post("/create", createNewProject);

// 프로젝트 수정
router.put("/update/:id", updateProject);

// 프로젝트 삭제
router.delete("/delete/:id", deleteProject);

// 프로젝트 조회
router.get("/:id", getProjectInfo);

export default router;
