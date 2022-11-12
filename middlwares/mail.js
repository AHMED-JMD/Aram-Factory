let nodemailer = require("nodemailer");
require("dotenv").config();

const SendMail = (email, link) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: "ahmedjmd0@gmail.com",
    subject: "Password Reset",
    text: `note the link will expire in 10 minutes \n ${link}`,
  };

  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = SendMail;
