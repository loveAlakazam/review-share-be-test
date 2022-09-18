import Projects from "../models/Projects";
import ProjectRequests from "../models/ProjectRequests";
import Users from "../models/Users";

import errorMsgs from "../commons/errors";
import * as service from "../service/projects";

export const getProjectInfo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json(errorMsgs.EMPTY_PROJECT_ID);
    }

    const project = await service.getProjectInfo(id);
    if (!project) {
      return res.status(404).json(errorMsgs.NOT_FOUND_PROJECT);
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
    if (!title) {
      return res.status(400).json(errorMsgs.EMPTY_TITLE);
    }
    if (!sns) {
      return res.status(400).json(errorMsgs.EMPTY_PRJ_SNS);
    }

    // sns 체크
    const snsAvailable = service.checkProjectSNS(sns);
    if (!snsAvailable) {
      return res.status(400).json(errorMsgs.NOT_ALLOW_SNS(sns));
    }

    // 프로젝트 등록
    service.createNewProject(title, sns);
    return res.status(204).end();
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
    const { prjId, title, sns } = req.body;
    if (!prjId) {
      return res.status(400).json(errorMsgs.EMPTY_PROJECT_ID);
    }

    if (!title) {
      return res.status(400).json(errorMsgs.EMPTY_TITLE);
    }

    if (!sns) {
      return res.status(400).json(errorMsgs.EMPTY_PRJ_SNS);
    }

    //프로젝트가 존재하는지 확인
    const project = await service.getProjectInfo(prjId);
    if (!project) {
      return res.status(400).json(errorMsgs.NOT_FOUND_PROJECT);
    }

    // sns체크
    const isAvailableSNS = service.checkProjectSNS(sns);
    if (!isAvailableSNS) {
      return res.status(400).json(errorMsgs.NOT_ALLOW_SNS(sns));
    }

    // 프로젝트 업데이트
    await service.updateProject(prjId, title, sns);

    return res.status(204).end();
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
    const { prjId } = req.query;
    if (!prjId) {
      return res
        .status(400)
        .json({ message: "조회하려는 projectId가 존재하지 않습니다!" });
    }

    const project = await Projects.findById(prjId);
    if (!project) {
      return res.status(404).json({
        message: "해당 projectId에 대응하는 프로젝트가 존재하지 않습니다.",
      });
    }

    const projectRequestList = await ProjectRequests.find({ project: prjId });
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
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      description: error,
    });
  }
};
