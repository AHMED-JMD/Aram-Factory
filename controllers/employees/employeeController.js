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
        app_date,
        address,
        notes,
        extra,
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
          extra &&
          grant17 &&
          grant19 &&
          grant20 &&
          grant22 &&
          grantGM &&
          insurance &&
          start_date &&
          app_date &&
          address &&
          filename
        )
      ) {
        return res.status(400).json("الرجاء ملء جميع الحقول");
      }

      //if no notes is provided
      if (!notes) notes = "";

      //filter inputs make sure no code is provided
      (emp_id = xssFilter.inHTMLData(emp_id)),
        (emp_name = xssFilter.inHTMLData(emp_name)),
        (Ssn = xssFilter.inHTMLData(Ssn)),
        (jobTitle = xssFilter.inHTMLData(jobTitle)),
        (salary = xssFilter.inHTMLData(salary)),
        (start_date = xssFilter.inHTMLData(start_date)),
        (app_date = xssFilter.inHTMLData(app_date)),
        (notes = xssFilter.inHTMLData(notes)),
        (address = xssFilter.inHTMLData(address)),
        (extra = xssFilter.inHTMLData(extra)),
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
        app_date,
        address,
        imgLink: filename,
        notes,
      });
      //add grants to grant db
      let newGrant = await Grants.create({
        extra,
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
      //set pagination
      const employees = await Employee.findAll({});

      //count rows number
      res.json({ employees });
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

      //find employee
      const employee = await Employee.findOne({ where: { emp_id } });
      //find employee grant
      const grant = await Grants.findOne({ where: { employeeEmpId: emp_id } });

      res.json({ employee, grant });
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
        penalty,
        phoneNum,
        start_date,
        address,
        notes,
      } = req.body;
      console.log(req.body);
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
        (penalty = xssFilter.inHTMLData(penalty)),
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
          start_salary: salary,
          penalty,
          phoneNum,
          start_date,
          address,
          notes,
        },
        { where: { emp_id } }
      );

      res.json("updated employee successfullt");
    } catch (error) {
      if (error) throw error;
      console.log(error);
    }
  },
  updateGrants: async (req, res) => {
    try {
      const { grantData, emp_id } = req.body;

      //check request is full
      if (
        !(
          grantData.extra &&
          grantData.grant17 &&
          grantData.grant19 &&
          grantData.grant20 &&
          grantData.grant22 &&
          grantData.grantGM &&
          grantData.insurance &&
          emp_id
        )
      ) {
        return res.status(400).json("الرجاء ادخال جميع الحقول ");
      }

      //update grants from database
      let newGrants = await Grants.update(
        {
          extra: grantData.extra,
          grant17: grantData.grant17,
          grant19: grantData.grant19,
          grant20: grantData.grant20,
          grant22: grantData.grant22,
          grantGM: grantData.grantGM,
          insurance: grantData.insurance,
        },
        { where: { employeeEmpId: emp_id } }
      );
      console.log(newGrants);
      //send to client
      res.json("upated grants successfully");
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
      let newEmployee = await Employee.findOne({ where: { emp_id } });

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
      newEmployee.imgLink = filename;
      await newEmployee.save();
      res.json(newEmployee);
    } catch (error) {
      if (error) throw error;
    }
  },
  delete: async (req, res) => {
    try {
      //get req body and make sure it is complete
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
        //delete from database both employee and his grants
        Grants.destroy({ where: { employeeEmpId: id } });
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
