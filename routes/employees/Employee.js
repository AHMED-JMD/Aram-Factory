const express = require("express");
const router = express.Router();
const multer = require("multer");
const employees = require("../../controllers/employees/employeeController");

//setting up multer disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//add employees
router.post("/add", upload.single("file"), employees.add);
//show all employess
router.get("/view", employees.viewAll);
//show on employee
router.post("/viewOne", employees.viewOne);
//update employees
router.post("/update", employees.update);
//delete employees
router.post("/delete", employees.delete);

module.exports = router;
