const express = require("express");
const router = express.Router();
const newPassword = require("../../controllers/users/resetPasswordCont");

router.post("/forget-password", newPassword.forget);

router.post("/verify-link", newPassword.verify);

router.post("/reset-password", newPassword.reset);

module.exports = router;
