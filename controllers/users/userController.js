const db = require("../../models/index");
const Admin = db.models.Admin;
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

      const newAdmin = await Admin.create({ username, phoneNum, password });

      //hash user password
      const salt = await bcrypt.genSalt(10);
      newAdmin.password = await bcrypt.hash(newAdmin.password, salt);

      //save user
      newAdmin
        .save()
        .then((user) => {
          res.json({
            user: {
              id: user.id,
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

      Admin.findOne({ where: { username } }).then((user) => {
        if (!user) {
          return res.status(400).json({ msg: "المستخدم غير موجود !" });
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json({ msg: "كلمة المرور غير صحيحة" });
          } else {
            //sign user
            jwt.sign(
              { id: user.admin_id },
              process.env.JWTSECRET,
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    phoneNum: user.phoneNum,
                    username: user.username,
                  },
                });
              }
            );
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  getbyid: async (req, res) => {
    Admin.findOne({ where: { admin_id: req.user.id } })
      .then((user) => {
        res.json({
          username: user.username,
          phoneNum: user.phoneNum,
        });
      })
      .catch((err) => console.log(err));
  },
};

module.exports = user;
