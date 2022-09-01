import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  snsList: [{ type: String, enum: ["NaverBlog", "Instagram"] }],
  nickname: String,
  requestCounts: { type: Number, default: 0 },
  birthOfYears: Number,
});

const SNS_LIST = ["Instagram", "NaverBlog"];
const NOW_YEAR = new Date().getFullYear();

userSchema.statics.checkSnsList = (inputSnsStr) => {
  let splitInputSNSList = inputSnsStr.split(",").map((e) => e.trim());

  // 요소의 중복을 막기 위해 set으로 변환하고 다시 array로 타입변경합니다.
  splitInputSNSList = Array.from(new Set(splitInputSNSList));

  // SNS_LIST 에 존재하는 sns만 filteredList에 저장합니다.
  const filteredList = splitInputSNSList.filter((sns) => {
    return SNS_LIST.includes(sns);
  });

  return filteredList;
};

// 유저의 연령대를 알아냅니다.
userSchema.statics.getUserAge = (userBirthYear) => {
  const age = NOW_YEAR - userBirthYear;
  if (age > 0) return age;
  return 0;
};

const Users = mongoose.model("User", userSchema, "users");
export default Users;
