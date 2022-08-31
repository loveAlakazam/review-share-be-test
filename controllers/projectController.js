import Projects from "../models/Projects";

export const getProjectInfo = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      description: error,
    });
  }
};

export const createNewProject = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      description: error,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      description: error,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      description: error,
    });
  }
};
