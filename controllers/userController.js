import Users from "../models/Users";

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
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};

export const deleteUserById = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", description: error });
  }
};
