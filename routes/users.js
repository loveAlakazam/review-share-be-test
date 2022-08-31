import { Router } from "express";
import {
  showUserById,
  createNewUser,
  updateUserInfo,
  deleteUserById,
  updateSnsList,
} from "../controllers/userController";

const router = Router();

// 유저 생성
router.post("/", createNewUser);

// 유저 정보 수정
router.put("/update/sns", updateSnsList);
router.put("/update/:id", updateUserInfo);

// 유저삭제
router.delete("/delete/:id", deleteUserById);

// 유저 조회
router.get("/", showUserById);

export default router;
