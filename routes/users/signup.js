const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const xssFilter = require("xss-filters");

router.post("/", async (req, res) => {
  let { username, phoneNum, password } = req.body;

  //filter input
  (phoneNum = xssFilter.inHTMLData(phoneNum)),
    (username = xssFilter.inHTMLData(username)),
    (password = xssFilter.inHTMLData(password));

  //check req.body
  if (!phoneNum || !username || !password) {
    return res.status(400).json({ msg: "قم بادخال جميع الحقول" });
  }

  User.findOne({ phoneNum })
    .then((user) => {
      if (user) {
        return res.status(400).json({ msg: "عفوا المستخدم موجود مسبقا" });
      }
    })
    .catch((err) => {
      if (err) console.log(err);
    });

  const newUser = new User({ username, phoneNum, password });

  //hash user password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  //save user
  newUser
    .save()
    .then((user) => {
      res.json({
        user: {
          id: user._id,
          phoneNum: user.phoneNum,
          username: user.username,
        },
      });
    })
    .catch((err) => {
      if (err) console.log("register_err:", err);
    });
});

module.exports = router;
