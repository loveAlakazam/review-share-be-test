import * as repository from "../repository/users";
import errorMsgs from "../commons/errors";
import SNS_LIST from "../commons/snsList";
import Users from "../models/Users";

export const findUserById = async (userId) => {
  try {
    // 유저조회
    const user = await repository.findUserById(userId);
    return user;
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
    // 유저정보 수정
    await repository.updateUserInfo(userId, nickname, snsList);
    return;
  } catch (error) {
    throw error;
  }
};

export const splitSnsList = (snsListStr) => {
  let splitInputSNSList = snsListStr.split(",").map((e) => e.trim());

  // 요소의 중복을 막기 위해 set으로 변환하고 다시 array로 타입변경합니다.
  splitInputSNSList = Array.from(new Set(splitInputSNSList));
  return splitInputSNSList;
};

export const checkSnsList = (snsListStr) => {
  const splitInputSNSList = splitSnsList(snsListStr);
  let result = true;

  splitInputSNSList.forEach((sns) => {
    const r = SNS_LIST.includes(sns);
    result = result && r;
  });

  return result;
};

export const updateSnsList = async (userId, snsList) => {
  try {
    // snsList 컬럼 업데이트
    await repository.updateSnsList(userId, snsList);
    return;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await repository.deleteUser(userId);
  } catch (error) {
    throw error;
  }
};
