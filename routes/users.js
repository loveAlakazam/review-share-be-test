const express = require("express");
const router = express.Router();

const { Users } = require("../models/Users");

router.get("/", (req, res) => {
  const user_id = req.query.id;

  Users.find({ _id: user_id }, (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ code: 500, message: "Internal ServerError", description: err });
    }

    if (!user) {
      return res.status(404).json({ code: 404, message: "Not found Data" });
    }

    return res.status(200).json({ code: 200, data: user });
  });
});

module.exports = router;
