const express = require("express");
const router = express.Router();
const validUser = require("../../middlwares/auth");
const user = require("../../controllers/users/userController");

router.post("/register", user.signup);

router.post("/login", user.login);

router.get("/get-user", validUser, user.getbyid);

module.exports = router;
