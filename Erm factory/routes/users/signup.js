const express = require("express");
const router = express.Router();
const user = require("../../controllers/users/usersController");

router.post("/", user.signup);

module.exports = router;
