const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  snsList: [{ type: String, enum: ["NaverBlog", "Instagram"] }],
  nickname: String,
  requestCounts: { type: Number, default: 0 },
  birthOfYears: Number,
});

// [instance-method]

userSchema.statics.addUser = function (newUser, cb) {
  this.create(
    {
      nickname: newUser.nickname,
      birthOfYears: newUser.birth_of_years,
    },
    (err) => {
      if (err) return cb(err);
      cb(null);
    }
  );
};

// [static-method]
// user_id로 검색하여 유저정보를 불러온다.
userSchema.statics.getUserById = function (user_id, cb) {
  return this.find({ _id: user_id }, (err, result) => {
    if (err) return cb(err);

    cb(null, result);
  });
};

const Users = mongoose.model("users", userSchema);
module.exports = { Users };
