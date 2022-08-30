import { Router } from "express";
import {
  createPrjRequest,
  readPrjRequest,
  deletePrjRequest,
} from "../controllers/projectRequestController";

const router = Router();

router.put("/create", createPrjRequest); // 프로젝트 신청 생성
router.get("/list/:id", readPrjRequest); // 프로젝트 신청 리스트 불러오기
router.delete("/delete", deletePrjRequest); // 프로젝트 신청 삭제

export default router;
