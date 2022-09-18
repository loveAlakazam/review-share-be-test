import * as repository from "../repository/projectRequests";
import * as prjRepo from "../repository/projects";
import * as userRepo from "../repository/users";
import errorMsgs from "../commons/errors";

export const findProjectRequestByUserIdAndProjectId = async (
  userId,
  projectId
) => {
  try {
    return await repository.findProjectRequestByUserIdAndProjectId(
      userId,
      projectId
    );
  } catch (error) {
    throw error;
  }
};

export const updateRequestCountsAndRequestUserLists = (
  project,
  user,
  userId
) => {
  // 1. User가 해당 Project의 SNS를 가지고 있는지 확인합니다.
  if (!user.snsList) {
    return errorMsgs.NOT_HAVE_SNSLIST;
  }

  const havePrjSNS = user.snsList.includes(project.sns);
  if (!havePrjSNS) {
    return errorMsgs.NOT_HAVE_PROJECT_SNS(project.sns);
  }

  // 2. 신청자의 requestCounts를 높입니다.
  userRepo.updateRequestCount(userId, user.requestCounts + 1);

  // 3. 신청 프로젝트의 requestUserList에 신청자 아이디를 추가합니다.
  prjRepo.addUserIdFromRequestUserList(userId, project.id);
  return;
};

export const createProjectRequest = async (userId, projectId, message) => {
  try {
    await repository.createProjectRequest(userId, projectId, message);
  } catch (error) {
    throw error;
  }
};

export const deleteProjectRequest = async (userId, projectId) => {
  try {
    // projectRequest를 탐색
    const targetPrjRequest =
      await repository.findProjectRequestByUserIdAndProjectId(
        userId,
        projectId
      );

    if (!targetPrjRequest) {
      return errorMsgs.NOT_FOUND_PROJECT_REQUEST;
    }

    // user가 존재하는지 확인
    const user = await userRepo.findUserById(userId);
    if (!user) {
      return errorMsgs.NOT_FOUND_USER;
    }

    // 1. Project의 requestUserList에서 userId 삭제
    await prjRepo.deleteUserIdFromRequestUserList(userId, projectId);

    // 2. User의 RequestCount를 낮춥니다.
    if (user.requestCounts > 0) {
      await userRepo.updateRequestCount(userId, user.requestCounts - 1);
    }

    // 3. projectRequest 삭제
    const prjReqId = targetPrjRequest.id;
    await repository.deleteProjectRequestById(prjReqId);
  } catch (error) {
    throw error;
  }
};
