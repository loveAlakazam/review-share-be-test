import Projects from "../models/Projects";

export const getProjectInfo = async (projectId) => {
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
