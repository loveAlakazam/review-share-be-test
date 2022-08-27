const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  snsList: [{ type: String, enum: ["NaverBlog", "Instagram"] }],
  nickname: String,
  requestCounts: { type: Number, default: 0 },
  birthOfYears: Number,
});

const Users = mongoose.model("users", userSchema);
module.exports = { Users };
