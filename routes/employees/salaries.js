const express = require("express");
const router = express.Router();
const checkout = require("../../controllers/employees/salariesController");

//add new checkout data
router.post("/", checkout.add);
//view checkouts with users
router.get("/", checkout.view);

module.exports = router;
