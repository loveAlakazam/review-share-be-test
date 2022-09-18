import errorMsgs from "../commons/errors";
import * as service from "../service/projects";

export const getProjectInfo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json(errorMsgs.EMPTY_PROJECT_ID);
    }

    const project = await service.findProjectById(id);
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
    const { projectId, title, sns } = req.body;
    if (!projectId) {
      return res.status(400).json(errorMsgs.EMPTY_PROJECT_ID);
    }

    if (!title) {
      return res.status(400).json(errorMsgs.EMPTY_TITLE);
    }

    if (!sns) {
      return res.status(400).json(errorMsgs.EMPTY_PRJ_SNS);
    }

    //프로젝트가 존재하는지 확인
    const project = await service.findProjectById(projectId);
    if (!project) {
      return res.status(400).json(errorMsgs.NOT_FOUND_PROJECT);
    }

    // sns체크
    const isAvailableSNS = service.checkProjectSNS(sns);
    if (!isAvailableSNS) {
      return res.status(400).json(errorMsgs.NOT_ALLOW_SNS(sns));
    }

    // 프로젝트 업데이트
    await service.updateProject(projectId, title, sns);

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
    const { projectId } = req.body;
    if (!projectId) {
      return res.status(400).json(errorMsgs.EMPTY_PROJECT_ID);
    }

    // 삭제대상 프로젝트 존재여부 확인
    const project = await service.findProjectById(projectId);
    if (!project) {
      return res.status(404).json(errorMsgs.NOT_FOUND_PROJECT);
    }

    // 프로젝트 requestUserList의 각 유저 requestCount를 감소
    const prjRequestUserList = project.requestUserList;
    if (prjRequestUserList.length > 0) {
      await service.substactAllUserRequestCounts(prjRequestUserList);
    }

    // 삭제대상 프로젝트의 projectRequests 모두 삭제
    await service.deleteAllProjectRequests(projectId);

    // 해당 projectId의 Project 삭제
    await service.deleteProject(projectId);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      description: error,
    });
  }
};
