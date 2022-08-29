const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = Schema({
  title: String,
  sns: { type: String, enum: ["NaverBlog", "Instagram"] },
  requestUserList: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// 프로젝트 생성

// 프로젝트 수정

// 프로젝트 삭제

// 프로젝트에 요청한 유저가 들어있는지 확인
projectSchema.methods.checkPrjReq = function (userId, cb) {
  this.model("projects").find(
    { requestUserList: { $contains: userId } },
    (err, result) => {
      if (err) return cb(err);
      cb(null, result);
    }
  );
};
const Projects = mongoose.model("projects", projectSchema);
module.exports = { Projects };
