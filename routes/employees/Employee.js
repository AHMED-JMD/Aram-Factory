const express = require("express");
const router = express.Router();
const multer = require("multer");
const employees = require("../../controllers/employees/employeeController");
const attend = require("../../controllers/employees/attendance");
const archive = require("../../controllers/employees/archiveController");
//setting up multer disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/build/images");
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
//show one employee
router.post("/viewOne", employees.viewOne);

//update employees
//1- update basic info
router.post("/update", employees.update);
//2- update grants
router.post("/update_grants", employees.updateGrants);
//3- update image
router.post("/update_image", upload.single("file"), employees.updateImage);

//delete employees
router.post("/delete", employees.delete);

//record absent
router.post("/absence", attend.absent);
//start new month
router.get("/new-month", attend.nwMonth);
//borrow from salary
router.post("/borrow", attend.borrow);
//warn employes
router.post("/warnings", attend.warn);

//add to archive
router.post("/archive", archive.add);
//return from archive
router.post("/archive/return", archive.return);
//view archive
router.get("/archive", archive.view);

module.exports = router;
