import Users from "../models/Users";
import mongoose from "mongoose";
import ProjectRequests from "../models/ProjectRequests";
import Projects from "../models/Projects";

import * as service from "../service/users";
import errorMsgs from "../commons/errors";

export const showUserByIdController = async (req, res) => {
  try {
    const { userId } = req.query;
    const userData = await service.showUserById(userId);

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
      return res.status(400).json(errorMsgs.NOT_FOUND_USER_ID);
    }

    if (!snsList) {
      return res.status(400).json();
    }

    if (!nickname) {
      return res.status(400).json();
    }

    const errMsg = await service.updateUserInfo(id, snsList, nickname);
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

    const errMsg = await service.updateSnsList(userId, snsList);
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
    const { id } = req.params;

    if (!id) {
      return res.status(400).json(errorMsgs.EMPTY_USER_ID);
    }

    const user = Users.findById(id);
    if (!user) {
      return res.status(404).json(errorMsgs.NOT_FOUND_USER_ID);
    }

    let query = { user: id };
    const prjReqList = await ProjectRequests.find(query);
    if (prjReqList.length) {
      // 해당 유저아이디가 포함되어있는 projectRequest들을 삭제합니다.
      await ProjectRequests.deleteMany({ user: id });
    }

    // project의 requestUserList 에서 해당 유저아이디를 제외시킵니다.
    query = { requestUserList: { $in: [id] } };
    const prjList = await Projects.find(query);
    if (prjList.length) {
      prjList.map((prj) => {
        // 각 프로젝트 정보에서 requestUserList 에서 탈퇴유저아이디를 제외시킵니다.
        const _prjReqUserList = prj.requestUserList;
        prj.requestUserList = _prjReqUserList.filter((userId) => {
          // == (Equal Operator)을 사용하여
          // userId(type: ObjectId) 와 id(string) 데이터타입 상관없이 값자체만으로 비교합니다
          return userId != id;
        });
        prj.save();
      });
    }

    // 해당 유저를 삭제합니다.
    await Users.deleteOne({ _id: id });

    res.status(204).end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};
