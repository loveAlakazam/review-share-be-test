import errorMsgs from "../commons/errors";
import SNS_LIST from "../commons/snsList";
import * as repository from "../repository/projects";

export const getProjectInfo = async (projectId) => {
  try {
    return await repository.getProjectInfo(projectId);
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
