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
      nickname: nickname,
      birthOfYears: birthOfYears,
    });
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (userId, nickname, snsList) => {
  try {
    return await Users.updateOne(
      { _id: userId },
      { nickname: nickname, snsList: snsList }
    );
  } catch (error) {
    throw error;
  }
};

export const updateSnsList = async (userId, snsList) => {
  try {
    return await Users.updateOne({ _id: userId }, { snsList: snsList });
  } catch (error) {
    throw error;
  }
};

export const updateRequestCount = async (userId, requestCounts) => {
  try {
    await Users.updateOne(
      { _id: userId },
      { $set: { requestCounts: requestCounts } }
    );
  } catch (error) {
    throw error;
  }
};

export const substractAllUserRequestCounts = async (requestUserList) => {
  try {
    return await Users.updateMany(
      {
        _id: { $in: requestUserList },
        requestCounts: { $gt: 0 },
      },
      { $inc: { requestCounts: -1 } }
    );
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    return await Users.deleteOne({ _id: userId });
  } catch (error) {
    throw error;
  }
};
