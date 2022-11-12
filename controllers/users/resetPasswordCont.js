const db = require("../../models/index");
const Admin = db.models.Admin;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SendMail = require("../../middlwares/mail");
require("dotenv").config();

let newPassword = {
  forget: async (req, res) => {
    try {
      const { email } = req.body;

      //find the user
      let newAdmin = await Admin.findOne({ where: { email } });
      //make sure user exists
      if (!newAdmin) return res.status(400).json("المستخدم غير موجود");

      //send token and id to work as a valid link
      let secret = process.env.JWTSECRET + newAdmin.password;
      const newToken = jwt.sign({ id: newAdmin.admin_id }, secret, {
        expiresIn: "10m",
      });

      //create link and mail it to admin
      let link = `http://localhost:40000/reset-password/${newAdmin.admin_id}/${newToken}`;
      console.log(link);
      //send link
      try {
        SendMail(newAdmin.email, link);
      } catch (error) {
        console.log(error);
      }

      res.json("ok");
    } catch (error) {
      if (error) throw error;
      console.log(error);
    }
  },
  verify: async (req, res) => {
    let { id, token } = req.body;

    //find the user
    let newAdmin = await Admin.findOne({ where: { admin_id: id } });
    //make sure user exists
    if (!newAdmin) return res.status(400).json("المستخدم غير موجود");

    //verify token
    let secret = process.env.JWTSECRET + newAdmin.password;
    try {
      const verify = jwt.verify(token, secret);
      res.json("verified successfully");
    } catch (error) {
      return res.status(400).json("Not verified Or link expired");
    }
  },
  reset: async (req, res) => {
    try {
      let { newPassword, id } = req.body;
      console.log(req.body);
      //hash user password
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(newPassword, salt);

      //update admin password
      await Admin.update(
        { password: hashedPassword },
        { where: { admin_id: id } }
      );

      res.json("updated password");
    } catch (error) {
      if (error) throw error;
      console.log(error);
    }
  },
};

module.exports = newPassword;
