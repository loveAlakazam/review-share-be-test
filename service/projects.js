import SNS_LIST from "../commons/snsList";
import * as repository from "../repository/projects";
import * as prjReqRepo from "../repository/ProjectRequests";
import * as userRepo from "../repository/users";

export const findProjectById = async (projectId) => {
  try {
    return await repository.findProjectById(projectId);
  } catch (error) {
    throw error;
  }
};

export const checkProjectSNS = (sns) => {
  return SNS_LIST.includes(sns);
};

export const createNewProject = async (title, sns) => {
  try {
    await repository.createNewProject(title, sns);
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (projectId, title, sns) => {
  try {
    await repository.updateProject(projectId, title, sns);
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    await repository.deleteProject(projectId);
  } catch (error) {
    throw error;
  }
};

export const deleteAllProjectRequests = async (projectId) => {
  try {
    // project가 projecdtId인 projectRequest 조회
    const projectRequestList = await prjReqRepo.findProjectRequestsByProjectId(
      projectId
    );

    if (projectRequestList.length) {
      // project가 projectId인 ProjectRequest 들도 같이 삭제
      await prjReqRepo.deleteProjectRequestsByProjectId(projectId);
      return;
    }
  } catch (error) {
    throw error;
  }
};

export const substactAllUserRequestCounts = async (requestUserList) => {
  try {
    await userRepo.substractAllUserRequestCounts(requestUserList);
  } catch (error) {
    throw error;
  }
};

export const checkUserIdInRequestUserList = (project, userId) => {
  // 프로젝트의 requestUserList필드 안에 userId가 있는지 확인
  return project.requestUserList.includes(userId);
};

export const deleteUserIdFromAllRequestUserList = async (userId) => {
  try {
    await repository.deleteUserIdFromAllRequestUserList(userId);
  } catch (error) {
    throw error;
  }
};
