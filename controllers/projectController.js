import Projects from "../models/Projects";

export const getProjectInfo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res
        .status(400)
        .json({ message: "조회하려는 projectId가 존재하지 않습니다!" });
    }
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
