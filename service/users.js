import Users from "../models/Users";
import * as repository from "../repository/users";

export const showUserById = async (userId) => {
  try {
    return await repository.findUserById(userId);
  } catch (error) {
    throw error;
  }
};

export const createNewUser = async (nickname, birthOfYears) => {
  try {
    return await repository.createNewUser(nickname, birthOfYears);
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (userId, snsList, nickname) => {
  try {
    // snsList 체크
    const _snsList = repository.checkSnsList(snsList);
    if (!_snsList.length) {
      return { message: "snsList는 Instagram 또는 NaverBlog를 입력해주세요!" };
    }

    // 유저조회
    const user = await repository.findUserById(userId);
    console.log(user);
    if (!user) {
      return { message: "존재하지 않는 유저입니다." };
    }

    // 유저정보 수정
    await repository.updateUserInfoBySave(user, nickname, _snsList);
    return;
  } catch (error) {
    throw error;
  }
};
