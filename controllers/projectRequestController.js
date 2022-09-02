import ProjectRequests from "../models/ProjectRequests";
import Users from "../models/Users";
import Projects from "../models/Projects";

const NOW_YEAR = new Date().getFullYear();

export const createPrjRequest = async (req, res) => {
  try {
    const { userId, projectId, message } = req.body;

    // 1-1. 이미 해당 Project를 신청했는지 확인합니다.
    const prjReq = await ProjectRequests.findOne({
      user: userId,
      project: projectId,
    });

    if (prjReq) {
      return res
        .status(400)
        .json({ message: "이미 해당 프로젝트에 신청하였습니다." });
    }

    const user = await Users.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "현재 요청한 user가 존재하지 않습니다." });
    }

    const project = await Projects.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ message: "현재 요청한 project가 존재하지 않습니다." });
    }

    // 1-2. Project.requestUserList에 해당 UserId가 있는지 확인합니다.
    const isAlreadyContainUserId = project.requestUserList.includes(userId);
    if (isAlreadyContainUserId) {
      return res
        .status(400)
        .json({ message: "이미 해당 프로젝트에 신청하였습니다." });
    }

    // 2. User가 해당 Project의 SNS를 가지고 있는지 확인합니다.
    if (!user.snsList) {
      return res.status(400).json({
        message: "현재 요청한 신청자는 sns를 갖고 있지 않습니다.",
      });
    }

    const havePrjSNS = user.snsList.includes(project.sns);
    if (!havePrjSNS) {
      return res.status(400).json({
        message: `신청자는 ${project.sns} 계정을 갖고 있지 않습니다.`,
      });
    }

    // 3. 신청 시 신청메시지는 필수 입니다.
    if (!message) {
      return res
        .status(400)
        .json({ message: "메시지 값이 존재하지 않습니다." });
    }

    // 4. User의 requestCounts를 높여줍니다.
    user.requestCounts += 1;
    user.save();

    // 5. Project의 requestUserList에 해당 User의 아이디가 추가됩니다.
    project.requestUserList.push(user.id);
    project.save();

    // 6. 신청이 완료되면 204응답 상태를 보냅니다.
    await ProjectRequests.create({
      user: userId,
      project: projectId,
      message,
    });

    res.status(204).end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};

export const deletePrjRequest = async (req, res) => {
  try {
    const { userId, projectId } = req.body;

    // 조건에 만족하는 projectRequest가 존재하는지 확인합니다.
    const targetPrjRequest = await ProjectRequests.findOne({
      user: userId,
      project: projectId,
    });

    if (!targetPrjRequest) {
      return res
        .status(404)
        .json({ message: "ProjectRequest가 존재하지 않습니다." });
    }

    // 1. ProjectRequest 를 삭제합니다.
    await ProjectRequests.deleteOne({
      _id: targetPrjRequest._id,
    });

    // 2. 해당 Project의 requestUserList에서 UserId를 삭제합니다.
    const user = await Users.findById(userId);

    await Projects.updateOne(
      { _id: projectId },
      { $pull: { requestUserList: { $eq: userId } } }
    );

    // 3. User의 requestCounts를 낮춰줍니다.
    if (user.requestCounts > 0) {
      await Users.updateOne(
        { _id: userId },
        { $set: { requestCounts: user.requestCounts - 1 } }
      );
    }

    // 4. 삭제가 완료되면 204응답 상태로 보냅니다.
    res.status(204).end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};

// ------

/*
const getUserAges = (requestUserList, ageGroup, obj) => {
  return new Promise((resolve, reject) => {
    Users.find({ _id: { $in: requestUserList } }, (err, users) => {
      if (err) {
        reject(err);
      }

      // 유저리스트가 비어있지 않을경우
      if (users.length) {
        users.map((user) => {
          const age = NOW_YEAR - user.birthOfYears;
          if (age >= 10) {
            const gen = parseInt(age / 10) * 10;
            const key = gen >= 50 ? "50s" : `${gen}s`;
            ageGroup[key] += 1;
          }
        });
      }
      obj.project.ageGroup = ageGroup;
      resolve(obj);
    });
  });
};
*/

export const readPrjRequest = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId가 존재하지 않습니다" });
    }

    // 최신 신청 순으로 정렬합니다.
    // populate() 는 RDBMS의 join 과 같습니다. 외래키를 인자로 받아서 조인합니다.
    const prjRequestList = await ProjectRequests.find({ user: userId })
      .sort({
        createdAt: -1,
      })
      .populate("project")
      .exec();

    const prjList = await Projects.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "requestUserList",
          foreignField: "_id",
          as: "requestUserInfoList",
        },
      },
    ]).exec();

    const _list = prjRequestList.map((prjReq) => {
      const _projectRequestId = prjReq._id; // 프로젝트신청 아이디

      const _project = prjReq.project;
      const _projectId = _project._id; // 프로젝트 아이디
      const _projectTitle = _project.title; // 프로젝트 타이틀

      const _ageGroup = { "10s": 0, "20s": 0, "30s": 0, "40s": 0, "50s": 0 };
      const obj = {
        projectRequestId: _projectRequestId,
        project: {
          id: _projectId,
          title: _projectTitle,
        },
      };

      // prjList 에서 projectId에 해당하는 프로젝트만 필터링합니다.
      const _prjInfo = prjList.filter((prj) => {
        // 객체를 문자열로 변환시켜서 비교합니다.
        return JSON.stringify(prj._id) === JSON.stringify(_projectId);
      });

      // console.log(_requestUserList);
      // 각 신청자 아이디에 대응되는 Users정보를 구한다. -> Users 나이를 구한다. -> ageGroup을 갱신
      if (_prjInfo.length) {
        const _prj = _prjInfo[0];
        const _requestUserInfoList = _prj.requestUserInfoList;
        if (_requestUserInfoList.length) {
          _requestUserInfoList.map((user) => {
            const age = NOW_YEAR - user.birthOfYears;
            if (age >= 10) {
              const gen = parseInt(age / 10) * 10;
              const key = gen >= 50 ? "50s" : `${gen}s`;
              _ageGroup[key] += 1;
            }
          });
        }
      }
      obj.project.ageGroup = _ageGroup;

      return obj;
    });

    /*
    const userIds = prjReq.project.requestUserList;
    const _ageGroup = prjReq.project.ageGroup;
    // console.log(userIds);
    if (userIds.length) {
      const users = await Users.find({ _id: { $in: userIds } });
      users.map((user) => {
        const age = NOW_YEAR - user.birthOfYears;
        if (age >= 10) {
          const gen = parseInt(age / 10) * 10;
          const key = gen >= 50 ? "50s" : `${gen}s`;
          _ageGroup[key] += 1;
        }

        console.log(user);
        console.log(_ageGroup);
        prjReq.project.ageGroup = _ageGroup;
      });
    }
    */

    return res
      .status(200)
      .json({ totalCounts: prjRequestList.length, list: _list });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};
