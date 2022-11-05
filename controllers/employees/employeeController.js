const db = require("../../models/index");
const xssFilter = require("xss-filters");
const fs = require("fs");
const path = require("path");
const Employee = db.models.Employee;
const Grants = db.models.Grants;

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/build/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single("file");

const employees = {
  add: async (req, res) => {
    try {
      let {
        emp_id,
        emp_name,
        Ssn,
        jobTitle,
        salary,
        penalty,
        phoneNum,
        start_date,
        address,
        notes,
        grant17,
        grant19,
        grant20,
        grant22,
        grantGM,
        insurance,
      } = req.body;

      const { filename } = req.file;

      //make sure all data is provided
      if (
        !(
          emp_id &&
          emp_name &&
          Ssn &&
          jobTitle &&
          salary &&
          penalty &&
          phoneNum &&
          grant17 &&
          grant19 &&
          grant20 &&
          grant22 &&
          grantGM &&
          insurance &&
          start_date &&
          address &&
          filename
        )
      ) {
        return res.status(400).json("الرجاء ملء جميع الحقول");
      }

      //filter inputs make sure no code is provided
      (emp_id = xssFilter.inHTMLData(emp_id)),
        (emp_name = xssFilter.inHTMLData(emp_name)),
        (Ssn = xssFilter.inHTMLData(Ssn)),
        (jobTitle = xssFilter.inHTMLData(jobTitle)),
        (salary = xssFilter.inHTMLData(salary)),
        (start_date = xssFilter.inHTMLData(start_date)),
        (notes = xssFilter.inHTMLData(notes)),
        (address = xssFilter.inHTMLData(address)),
        (grant17 = xssFilter.inHTMLData(grant17)),
        (grant19 = xssFilter.inHTMLData(grant19)),
        (grant20 = xssFilter.inHTMLData(grant20)),
        (grant22 = xssFilter.inHTMLData(grant22)),
        (grantGM = xssFilter.inHTMLData(grantGM)),
        (insurance = xssFilter.inHTMLData(insurance)),
        (phoneNum = xssFilter.inHTMLData(phoneNum));

      //make sure employee is unique
      let employee = await Employee.findOne({ where: { emp_id } });
      if (employee) return res.status(400).json("الرقم التعريفي موجود مسبقا");

      //add employee to database
      //if no notes is provided
      if (!notes) notes = "";
      const newEmployee = await Employee.create({
        emp_id,
        emp_name,
        Ssn,
        jobTitle,
        salary,
        start_salary: salary,
        penalty,
        phoneNum,
        start_date,
        address,
        imgLink: filename,
        notes,
      });
      //add grants to grant db
      let newGrant = await Grants.create({
        grant17,
        grant19,
        grant20,
        grant22,
        grantGM,
        insurance,
        employeeEmpId: emp_id,
      });

      res.json({ newEmployee, newGrant });
    } catch (error) {
      console.log(error);
      if (error) throw error;
    }
  },
  viewAll: async (req, res) => {
    try {
      let { page } = req.headers || 0;
      //set pagination
      const employees = await Employee.findAll({
        offset: page * 10,
        limit: 10,
      });

      //count rows number
      const count = await Employee.count();
      res.json({ count, employees });
    } catch (error) {
      if (error) throw error;
      console.log(error);
    }
  },
  viewOne: async (req, res) => {
    try {
      const { emp_id } = req.body;

      if (!emp_id) {
        return res.status(400).json("no employee id is given");
      }

      const employee = await Employee.findOne({ where: { emp_id } });

      res.json(employee);
    } catch (error) {
      if (error) throw error;
      console.log(error);
    }
  },
  update: async (req, res) => {
    try {
      let {
        emp_id,
        emp_name,
        Ssn,
        jobTitle,
        salary,
        phoneNum,
        start_date,
        address,
        notes,
      } = req.body;
      console.log(req.body);
      let { filename } = req.file;
      //make sure all data is provided
      if (
        !(
          emp_id &&
          emp_name &&
          Ssn &&
          jobTitle &&
          salary &&
          phoneNum &&
          start_date &&
          address &&
          notes
        )
      ) {
        return res.status(400).json("الرجاء ملء جميع الحقول");
      }

      //filter inputs make sure no code is provided
      (emp_id = xssFilter.inHTMLData(emp_id)),
        (emp_name = xssFilter.inHTMLData(emp_name)),
        (Ssn = xssFilter.inHTMLData(Ssn)),
        (jobTitle = xssFilter.inHTMLData(jobTitle)),
        (salary = xssFilter.inHTMLData(salary)),
        (start_date = xssFilter.inHTMLData(start_date)),
        (address = xssFilter.inHTMLData(address)),
        (notes = xssFilter.inHTMLData(notes)),
        (phoneNum = xssFilter.inHTMLData(phoneNum));

      //update employee now
      const newEmployee = await Employee.update(
        {
          emp_name,
          Ssn,
          jobTitle,
          salary,
          phoneNum,
          start_date,
          address,
          notes,
        },
        { where: { emp_id } }
      );

      res.json(newEmployee);
    } catch (error) {
      if (error) throw error;
      console.log(error);
    }
  },
  updateGrants: async (req, res) => {
    try {
      const { grant17, grant19, grant20, grant22, grantGM, insurance, emp_id } =
        req.body;

      //check request is full
      if (
        !(
          grant17 &&
          grant19 &&
          grant20 &&
          grant22 &&
          grantGM &&
          insurance &&
          emp_id
        )
      ) {
        return res.status(400).json("الرجاء ادخال جميع الحقول ");
      }

      //update grants from database
      let newGrants = await Grants.update(
        { grant17, grant19, grant20, grant22, grantGM, insurance },
        { where: { employeeEmpId: emp_id } }
      );
      //send to client
      res.json(newGrants);
    } catch (error) {
      if (error) throw error;
    }
  },
  updateImage: async (req, res) => {
    try {
      let { filename } = req.file;
      let { emp_id } = req.body;

      //check request
      if (!emp_id) return res.status(400).json("add employee id");

      //find and update employees
      let newEmployee = await Employee.findOne({ emp_id });
      newEmployee.imgLink = filename;

      //delete from fs system
      fs.unlink(
        path.join(
          __dirname,
          `../../client/build/images/${newEmployee.imgLink}`
        ),
        (err) => {
          if (err) console.log(err);
          console.log("deleted from fs successfully");
        }
      );
      //save changes
      await newEmployee.save();
      res.json(newEmployee);
    } catch (error) {
      if (error) throw error;
    }
  },
  delete: async (req, res) => {
    try {
      const { emp_id } = req.body;
      console.log(emp_id);
      if (!emp_id) {
        return res.status(400).json("no id is provided");
      }

      //delete from database
      emp_id.map(async (id) => {
        //find imglink to delete from fs
        let employee = await Employee.findOne({ where: { emp_id: id } });
        //find and delete from server
        fs.unlink(
          path.join(__dirname, `../../client/build/images/${employee.imgLink}`),
          (err) => {
            if (err) console.log(err);
            else {
              console.log("deleted video successfully from fs");
            }
          }
        );
        //delete from database
        Employee.destroy({ where: { emp_id: id } });
      });
      res.send("deleted records successfully");
    } catch (error) {
      if (error) throw error;
      console.log(error);
    }
  },
};

module.exports = employees;
