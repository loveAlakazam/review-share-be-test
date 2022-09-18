import ProjectRequests from "../models/ProjectRequests";
import Projects from "../models/Projects";

export const findProjectRequestsByProjectId = async (projectId) => {
  try {
    return await Projects.find({ project: projectId });
  } catch (error) {
    throw error;
  }
};

export const findProjectRequestByUserIdAndProjectId = async (
  userId,
  projectId
) => {
  try {
    return await ProjectRequests.findOne({ user: userId, project: projectId });
  } catch (error) {
    throw error;
  }
};

export const deleteProjectRequestsByProjectId = async (projectId) => {
  try {
    await ProjectRequests.deleteMany({ project: projectId });
  } catch (error) {
    throw error;
  }
};

export const createProjectRequest = async (userId, projectId, message) => {
  try {
    await ProjectRequests.create({
      user: userId,
      project: projectId,
      message,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteProjectRequestById = async (prjReqId) => {
  try {
    await ProjectRequests.deleteOne({
      _id: prjReqId,
    });
  } catch (error) {
    throw error;
  }
};

export const findProjectRequestByUserId = async (userId) => {
  try {
    return await ProjectRequests.find({ user: userId });
  } catch (error) {
    throw error;
  }
};

export const deleteProjectRequestsByUserId = async (userId) => {
  try {
    return await ProjectRequests.deleteMany({ user: userId });
  } catch (error) {
    throw error;
  }
};
