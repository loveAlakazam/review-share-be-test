import ProjectRequests from "../models/ProjectRequests";
import Users from "../models/Users";
import Projects from "../models/Projects";

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

export const readPrjRequest = async (req, res) => {};

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
