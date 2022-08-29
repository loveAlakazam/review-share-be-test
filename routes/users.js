import { Router } from "express";
import { showUserInfo, createNewUser } from "../controllers/userController";

const router = Router();

// 유저 조회
router.get("/", showUserInfo);

// 유저 생성
router.post("/", createNewUser);

export default router;
