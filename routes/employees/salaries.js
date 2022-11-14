const express = require("express");
const router = express.Router();
const checkout = require("../../controllers/employees/salariesController");

//add new checkout data
router.post("/add", checkout.add);
//get one checkout
router.post("/get-one", checkout.viewOne);
//view checkouts with users
router.get("/view", checkout.view);
//view users with their grants
router.get("/get-all", checkout.viewSchedule);
//delete checkout
router.post("/delete", checkout.delete);

module.exports = router;
