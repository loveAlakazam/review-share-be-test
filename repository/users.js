import Users from "../models/Users";

export const findUserById = async (userId) => {
  try {
    return await Users.findById(userId);
  } catch (error) {
    throw error;
  }
};

export const createNewUser = async (nickname, birthOfYears) => {
  try {
    return await Users.create({
      nickname,
      birthOfYears,
    });
  } catch (error) {
    throw error;
  }
};

export const checkSnsList = (snsList) => {
  try {
    return Users.checkSnsList(snsList);
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (userId, nickname, snsList) => {
  try {
    return await Users.updateOne(
      { $eq: { id: userId } },
      { $set: { nickname: nickname, snsList: snsList } }
    );
  } catch (error) {
    throw error;
  }
};

export const updateSnsList = async (userId, snsList) => {
  try {
    return await Users.updateOne(
      {
        $eq: { id: userId },
      },
      { $set: { snsList: snsList } }
    );
  } catch (error) {
    throw error;
  }
};
