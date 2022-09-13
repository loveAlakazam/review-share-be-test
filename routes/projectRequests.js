import { Router } from "express";
import {
  createPrjRequest,
  readPrjRequest,
  deletePrjRequest,
} from "../controllers/projectRequestController";

const router = Router();

router.post("/", createPrjRequest); // 프로젝트 신청 생성
router.get("/list", readPrjRequest); // 프로젝트 신청 리스트 불러오기
router.delete("/", deletePrjRequest); // 프로젝트 신청 삭제

export default router;
