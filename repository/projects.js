import Projects from "../models/Projects";

export const findProjectById = async (projectId) => {
  try {
    return await Projects.findById(projectId);
  } catch (error) {
    throw error;
  }
};

export const createNewProject = async (title, sns) => {
  try {
    return await Projects.create({
      title,
      sns,
    });
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (projectId, title, sns) => {
  try {
    return await Projects.updateOne(
      { _id: projectId },
      { $set: { title: title, sns: sns } }
    );
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    return await Projects.deleteOne({ _id: projectId });
  } catch (error) {
    throw error;
  }
};

export const addUserIdFromRequestUserList = async (userId, projectId) => {
  try {
    await Projects.updateOne(
      {
        _id: projectId,
      },
      { $push: { requestUserList: userId } }
    );
  } catch (error) {
    throw error;
  }
};

export const deleteUserIdFromRequestUserList = async (userId, projectId) => {
  try {
    await Projects.updateOne(
      {
        _id: projectId,
      },
      { $pull: { requestUserList: { $eq: userId } } }
    );
  } catch (error) {
    throw error;
  }
};

export const deleteUserIdFromAllRequestUserList = async (userId) => {
  try {
    return await Projects.updateMany(
      { requestUserList: userId },
      { $pull: { requestUserList: userId } }
    );
  } catch (error) {
    throw error;
  }
};
