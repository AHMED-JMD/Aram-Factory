const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const xssFilter = require("xss-filters");
const jwt = require("jsonwebtoken");
const validUser = require("../../middlwares/auth");

router.post("/", async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: "قم بادخال جميع الحقول" });
    }

    //filter input
    (username = xssFilter.inHTMLData(username)),
      (password = xssFilter.inHTMLData(password));

    User.findOne({ username }).then((user) => {
      if (!user) {
        return res.status(400).json({ msg: "المستخدم غير موجود !" });
      }

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ msg: "كلمة المرور غير صحيحة" });
        } else {
          //sign user
          jwt.sign({ id: user.id }, process.env.JWTSECRET, (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                phoneNum: user.phoneNum,
                username: user.username,
              },
            });
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-user", validUser, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
