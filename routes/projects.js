import express from "express";
import {
  getProjectInfo,
  createNewProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController";

const router = express.Router();

// 프로젝트 생성
router.post("/", createNewProject);

// 프로젝트 수정
router.put("/:id", updateProject);

// 프로젝트 삭제
router.delete("/:id", deleteProject);

// 프로젝트 조회
router.get("/:id", getProjectInfo);

export default router;
