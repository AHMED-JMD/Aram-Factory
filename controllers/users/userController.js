const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const xssFilter = require("xss-filters");
const jwt = require("jsonwebtoken");

const user = {
  signup: async (req, res) => {
    try {
      let { username, phoneNum, password } = req.body;
      console.log(username, phoneNum, password);
      //check req.body
      if (!(username && phoneNum && password)) {
        return res.status(400).json({ msg: "قم بادخال جميع الحقول" });
      }

      //filter input
      (phoneNum = xssFilter.inHTMLData(phoneNum)),
        (username = xssFilter.inHTMLData(username)),
        (password = xssFilter.inHTMLData(password));

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
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
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
  },
  getbyid: async (req, res) => {
    User.findById(req.user.id)
      .select("-password")
      .then((user) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  },
};

module.exports = user;
