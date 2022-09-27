const express = require("express");
const router = express.Router();
const validUser = require("../../middlwares/auth");
const user = require("../../controllers/users/usersController");

router.post("/", user.login);

router.get("/get-user", validUser, user.getbyid);

module.exports = router;
