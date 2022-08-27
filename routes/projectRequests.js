const express = require("express");
const { post } = require("./users");
const router = express.Router();

// 프로젝트 신청
router.post("/", (req, res) => {
  const userId = req.body.userId;
  const projectId = req.body.projectId;
  const message = req.body.message;

  // 1. 이미 해당 Project를 신청했는지 확인
  // 2. User가 해당 Project의 SNS를 갖고 있는지 확인
  // 3. 신청메시지 값 확인
  // 4. User의 RequestCounts 값 증가
  // 5. ProjectRequest의 requestUserList에 해당 User 아이디 추가
  // 6. 신청완료되면 204 코드 응답
});

// 내 프로젝트 신청 리스트 불러오기
router.get("/my/list", (req, res) => {
  const userId = req.body.userId;
});

// 프로젝트 신청 삭제

module.exports = router;
