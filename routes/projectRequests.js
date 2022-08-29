const express = require("express");
const { post } = require("./users").default;
const router = express.Router();
const mongoose = require("mongoose");

const { Users } = require("../models/Users");
const { Projects } = require("../models/Projects");
const { ProjectRequests } = require("../models/ProjectRequests");

// 프로젝트 신청
router.post("/", async (req, res) => {
  const userId = req.body.userId;
  const projectId = req.body.projectId;
  const message = req.body.message;

  try {
    // 유저아이디, 프로젝트 아이디, 메시지 값 확인
    if (!userId && !projectId && !message) {
      res.status(400).json({
        code: 400,
        message: "입력값이 누락되었습니다.",
      });
      return;
    }

    const prjRequests = await ProjectRequests.find({
      user: mongoose.Types.ObjectId(userId),
      project: mongoose.Types.ObjectId(projectId),
    }).exec();

    // console.log(prjRequests);

    const user = await Users.findById(userId).exec();
    // console.log(user);

    const project = await Projects.findById(projectId).exec();

    // 이미 해당 Project를 신청했는지 확인
    // project.requestUserList 에 요청한 유저가 들어있는지 확인한다.
    const isAlreadyRequestedPrj = project.checkPrjReq(userId, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    console.log(isAlreadyRequestedPrj);

    // if (isAlreadyRequestedPrj) {
    //   res.status(400).json({
    //     code: 400,
    //     message: "이미 프로젝트를 신청했습니다.",
    //   });
    //   return;
    // }

    // 2. User가 해당 Project의 SNS를 갖고 있는지 확인
    // 2-1. 프로젝트 sns는 'NaverBlog'/'Instagram' 중 하나
    // 2-2. User의 snsList는 [], ['NaverBlog'], ['Instagram'], ['NaverBlog', 'Instagram']
    // case 1: User의 snsList에는 ['NaverBlog']만 있고, Project의 sns는 'Instagram'일경우 => snsList에는 'Instagram'이 없으므로 실패 리스폰스
    // case 2: User의 snsList에는 [] 상태로 아무것도 없고, Project sns는 'Instagram'인 경우 => snsList에는 'Instagram'이 없으므로 실패 리스폰스
    // case 3: User의 snsList에는 ['NaverBlog', 'Instagram']만 있고 Project의 sns는 'Instagram'일 경우 => snsList에 'Instagram'이 존재하므로 다음로직으로 진행
    // => user.snsList에서 project.sns 가 있는지 확인.
    const checkSns = await user.find({
      _id: userId,
      snsList: { $in: project.sns },
    });

    console.log(checkSns);

    // 4. User의 RequestCounts 값 증가

    // 5. Project의 requestUserList에 해당 User 아이디 추가
    // 6. 신청완료되면 204 코드 응답
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      description: err,
    });
  }
});

// 내 프로젝트 신청 리스트 불러오기
router.get("/my/list", (req, res) => {
  const userId = req.body.userId;
});

// 프로젝트 신청 삭제

module.exports = router;
