const db = require("../../models/index");
const xssFilter = require("xss-filters");

const Employee = db.models.Employee;

const employees = {
  add: async (req, res) => {
    try {
      let {
        emp_id,
        emp_name,
        Ssn,
        jobTitle,
        salary,
        phoneNum,
        date_birth,
        notes,
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
          phoneNum &&
          date_birth &&
          filename &&
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
        (date_birth = xssFilter.inHTMLData(date_birth)),
        (notes = xssFilter.inHTMLData(notes)),
        (phoneNum = xssFilter.inHTMLData(phoneNum));

      //add employee to database
      const newEmployee = await Employee.create({
        emp_id,
        emp_name,
        Ssn,
        jobTitle,
        salary,
        phoneNum,
        date_birth,
        imgLink: filename,
        notes,
      });
      //save
      const data = await newEmployee.save();
      res.json(data);
    } catch (error) {
      console.log(error);
      if (error) throw error;
    }
  },
  viewAll: async (req, res) => {
    try {
      const employees = await Employee.findAll();

      res.json(employees);
    } catch (error) {
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
        date_birth,
        notes,
      } = req.body;

      //make sure all data is provided
      if (
        !(
          emp_id &&
          emp_name &&
          Ssn &&
          jobTitle &&
          salary &&
          phoneNum &&
          date_birth &&
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
        (date_birth = xssFilter.inHTMLData(date_birth)),
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
          date_birth,
          notes,
        },
        { where: { emp_id } }
      );

      res.json(newEmployee);
    } catch (error) {
      console.log(error);
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
      emp_id.map((id) => {
        Employee.destroy({ where: { emp_id: id } });
      });
      res.send("deleted records successfully");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = employees;
