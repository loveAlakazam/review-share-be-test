import Users from "../models/Users";
import ProjectRequests from "../models/ProjectRequests";
import Projects from "../models/Projects";

import * as service from "../service/users";
import * as prjService from "../service/projects";
import * as prjReqService from "../service/projectRequests";
import errorMsgs from "../commons/errors";

export const showUserByIdController = async (req, res) => {
  try {
    const { userId } = req.query;

    const userData = await service.findUserById(userId);

    if (!userData) {
      return res.status(404).json(errorMsgs.NOT_FOUND_USER_ID);
    }

    return res.status(200).json({ user: userData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};

export const createNewUserController = async (req, res) => {
  try {
    const { nickname, birthOfYears } = req.body;
    const newUser = await service.createNewUser(nickname, birthOfYears);

    return res.status(200).json({
      userId: newUser._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};

export const updateUserInfoController = async (req, res) => {
  try {
    const { id } = req.params;
    const { snsList, nickname } = req.body;

    if (!id) {
      return res.status(404).json(errorMsgs.NOT_FOUND_USER_ID);
    }

    if (!snsList) {
      return res.status(400).json(errorMsgs.EMPTY_SNSLIST);
    }

    if (!nickname) {
      return res.status(400).json(errorMsgs.EMPTY_NICKNAME);
    }

    // 유저조회
    const user = await service.findUserById(id);
    if (!user) {
      return res.status(400).json(errorMsgs.NOT_FOUND_USER_ID);
    }

    // snsList 체크
    const isAvailableSNSList = service.checkSnsList(snsList);
    if (!isAvailableSNSList) {
      return res.status(400).json(errorMsgs.NOT_ALLOW_SNSLIST);
    }

    // update userInfo
    const _snsList = service.splitSnsList(snsList);
    const errMsg = await service.updateUserInfo(id, _snsList, nickname);
    if (errMsg) {
      return res.status(400).json(errMsg);
    }

    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};

export const updateSnsListController = async (req, res) => {
  try {
    const { userId, snsList } = req.body;

    if (!userId) {
      return res.status(400).json(errorMsgs.EMPTY_USER_ID);
    }
    if (!snsList) {
      return res.status(400).json(errorMsgs.EMPTY_SNSLIST);
    }

    // 유저조회
    const user = await service.findUserById(userId);
    if (!user) {
      return res.status(400).json(errorMsgs.NOT_FOUND_USER_ID);
    }

    // snsList체크
    const isAvailableSNSList = service.checkSnsList(snsList);
    if (!isAvailableSNSList) {
      return res.status(400).json(errorMsgs.NOT_ALLOW_SNSLIST);
    }

    // 유저 snsList 정보 수정
    const _snsList = service.splitSnsList(snsList);
    const errMsg = await service.updateSnsList(userId, _snsList);
    if (errMsg) {
      return res.status(400).json(errMsg);
    }

    res.status(204).end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};

export const deleteUserByIdController = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json(errorMsgs.EMPTY_USER_ID);
    }

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json(errorMsgs.NOT_FOUND_USER_ID);
    }

    //1. project의 requestUserList 에서 해당 유저아이디를 제외시킵니다.
    await prjService.deleteUserIdFromAllRequestUserList(userId);

    // 2. 프로젝트 리스트 삭제
    const prjReqList = await prjReqService.findProjectRequestsByUserId(userId);
    if (prjReqList.length > 0) {
      await prjReqService.deleteProjectRequestsByUserId(userId);
    }

    // 3. 해당 유저를 삭제합니다.
    await service.deleteUser(userId);

    res.status(204).end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};
