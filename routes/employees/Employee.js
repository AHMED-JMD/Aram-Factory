const express = require("express");
const router = express.Router();
const multer = require("multer");
const employees = require("../../controllers/employees/employeeController");
const attend = require("../../controllers/employees/attendance");
const Expelled = require("../../controllers/employees/warnedCont");
const Borrowed = require("../../controllers/employees/borrowCont");
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
router.get("/absence/delete", attend.deleteAll);
router.post("/absence/findOne", attend.findByDate);


//borrow from salary
router.post("/borrow", Borrowed.post);
router.get("/borrow", Borrowed.get);
router.get("/borrow/deleteAll", Borrowed.deleteAll);
router.post("/borrow/return", Borrowed.return);

//warn employes
router.post("/warnings", Expelled.warn);
router.get("/warnings", Expelled.get); 
router.post("/warnings/return", Expelled.return);

//add to archive
router.post("/archive", archive.add);
//return from archive
router.post("/archive/return", archive.return);
//view archive
router.get("/archive", archive.view);

module.exports = router;
