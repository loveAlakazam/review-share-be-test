import Users from "../models/Users";
import mongoose from "mongoose";

export const showUserById = async (req, res) => {
  try {
    const { userId } = req.query;
    const userData = await Users.findById(userId);
    res.status(200).json({ user: userData });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};

export const createNewUser = async (req, res) => {
  try {
    const { nickname, birth_of_years } = req.body;
    const newUser = await Users.create({
      nickname,
      birthOfYears: birth_of_years,
    });

    res.status(200).json({
      userId: newUser._id,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { snsList, nickname } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "유저 아이디 값이 존재하지 않습니다." });
    }

    if (!snsList || !nickname) {
      return res
        .status(400)
        .json({ message: "snsList와 nickname 모두 입력해주세요!" });
    }

    const _snsList = Users.checkSnsList(snsList);

    if (!_snsList.length) {
      return res.status(404).json({
        message: "snsList는 Instagram 또는 NaverBlog를 입력해주세요!",
      });
    }

    const user = await Users.findById(id);
    user.nickname = nickname;
    user.snsList = _snsList;
    user.save();

    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};

export const updateSnsList = async (req, res) => {
  try {
    const { userId, snsList } = req.body;
    console.log(userId, snsList);
    if (!userId || !snsList) {
      return res
        .status(400)
        .json({ message: "userId, snsList 데이터가 비어있습니다." });
    }

    const _snsList = Users.checkSnsList(snsList);
    if (!_snsList.length) {
      return res.status(400).json({
        message: "입력한 sns 로 유저의 snsList에 등록할 수 없습니다.",
      });
    }

    // snsList 컬럼 업데이트
    await Users.updateOne(
      { _id: userId },
      { $push: { snsList: { $each: _snsList } } }
    );

    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    // projectRequest 에서 해당 유저아이디를 삭제합니다.
    // project의 requestUserList 에서 해당 유저아이디를 삭제합니다.
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};
