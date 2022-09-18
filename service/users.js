import * as repository from "../repository/users";
import errorMsgs from "../commons/errors";

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
      return errorMsgs.NOT_ALLOW_SNSLIST;
    }

    // 유저조회
    const user = await repository.findUserById(userId);
    console.log(user);
    if (!user) {
      return errorMsgs.NOT_FOUND_USER;
    }

    // 유저정보 수정
    await repository.updateUserInfo(userId, nickname, _snsList);
    return;
  } catch (error) {
    throw error;
  }
};

export const updateSnsList = async (userId, snsList) => {
  try {
    // snsList 체크
    const _snsList = repository.checkSnsList(snsList);
    if (!_snsList.length) {
      return errorMsgs.NOT_ALLOW_SNSLIST;
    }

    // snsList 컬럼 업데이트
    repository.updateSnsList(userId, _snsList);
    return;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {};
