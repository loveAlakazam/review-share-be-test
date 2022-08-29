const express = require("express");
const router = express.Router();

const { Users } = require("../models/Users");

// 유저 조회
router.get("/", (req, res) => {
  const user_id = req.query.id;

  Users.getUserById(user_id, (err, user) => {
    try {
      if (!user) {
        res.status(404).json({ code: 404, message: "User not found" });
      }

      res.status(200).json({ code: 200, data: user });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
        description: err,
      });
    }
  });
});

// 유저 생성
router.post("/", (req, res) => {
  const nickname = req.body.nickname;
  const birth_of_years = req.body.birth_of_years;

  const newUser = {
    nickname: nickname,
    birth_of_years: birth_of_years,
  };

  Users.addUser(newUser, (err) => {
    try {
      if (!nickname || !birth_of_years) {
        res.status(400).json({ code: 400, message: "Bad Request" });
        return;
      }

      if (isNaN(birth_of_years)) {
        res.status(400).json({ code: 400, message: "Bad Request (is NaN)" });
        return;
      }

      res.status(200).json({ code: 200 });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: "internal server error",
        description: err,
      });
    }
  });
});

module.exports = router;
