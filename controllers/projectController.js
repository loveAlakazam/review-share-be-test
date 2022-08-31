import Projects from "../models/Projects";
import ProjectRequests from "../models/ProjectRequests";
import Users from "../models/Users";

export const getProjectInfo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ message: "조회하려는 projectId가 존재하지 않습니다!" });
    }

    const project = await Projects.findById(id);
    if (!project) {
      return res.status(404).json({
        message: "해당 projectId에 대응되는 프로젝트가 존재하지 않습니다.",
      });
    }

    return res.status(200).json({
      data: project,
    });
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
    const { title, sns } = req.body;
    if (!title || !sns) {
      return res
        .status(400)
        .json({ message: "title과 sns 모두 데이터가 필요합니다." });
    }

    const snsAvailable = Projects.checkProjectSNS(sns);
    if (!snsAvailable) {
      // sns 가 Instagram/NaverBlog 가 아니라면
      return res.status(400).json({
        message: "입력한 sns는 NaverBlog 와 Instagram 외의 sns 입니다.",
      });
    }

    await Projects.create({
      title,
      sns,
    });

    return res.status(200).end();
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
    const { id } = req.params;
    const { title, sns } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ message: "조회하려는 projectId가 존재하지 않습니다!" });
    }

    if (!title || !sns) {
      return res
        .status(400)
        .json({ message: "title과 sns 모두 데이터가 필요합니다." });
    }

    const isAvailableSNS = Projects.checkProjectSNS(sns);
    if (!isAvailableSNS) {
      return res.status(400).json({
        message: "입력한 sns는 NaverBlog 와 Instagram 외의 sns 입니다.",
      });
    }

    await Projects.updateOne({ _id: id }, { $set: { title: title, sns: sns } });

    return res.status(200).end();
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
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ message: "조회하려는 projectId가 존재하지 않습니다!" });
    }

    const project = await Projects.findById(id);
    if (!project) {
      return res.status(404).json({
        message: "해당 projectId에 대응하는 프로젝트가 존재하지 않습니다.",
      });
    }

    const projectRequestList = await ProjectRequests.find({ project: id });
    console.log(projectRequestList);
    if (projectRequestList.length) {
      projectRequestList.map(async (prjReq) => {
        const userId = prjReq.user;
        const user = await Users.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "유저가 존재하지 않습니다!" });
        }

        // 해당프로젝트를 요청한 각 유저의 requestCounts를 감소시킵니다.
        // (단, requestCountst가 0이면 감소를 하지 않습니다.)
        if (user.requestCounts > 0) {
          user.requestCounts -= 1;
          user.save();
        }
      });

      // project가 projectId인 ProjectRequest 들도 같이 삭제
      await ProjectRequests.deleteMany({ project: id });
    }

    // 해당 projectId의 Project 삭제
    await Projects.deleteOne({ _id: id });
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      description: error,
    });
  }
};
