import { Router } from "express";
import {
  showUserByIdController,
  createNewUserController,
  updateUserInfoController,
  deleteUserByIdController,
  updateSnsListController,
} from "../controllers/userController";

const router = Router();

// 유저 생성
router.post("/", createNewUserController);

// 유저 조회
router.get("/", showUserByIdController);

// 유저삭제
router.delete("/", deleteUserByIdController);

// 유저 정보 수정
router.put("/sns", updateSnsListController);
router.put("/:id", updateUserInfoController);

export default router;
