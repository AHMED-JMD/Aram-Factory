const db = require("../../models/index");
const xssFilter = require("xss-filters");
const { Sequelize } = require("sequelize");

const Employee = db.models.Employee;
const Deduct = db.models.Deduct;

const attend = {
  absent: async (req, res) => {
    try {
      const { ids, date } = req.body;
      console.log(ids);
      //make sure ids are given
      if (!(ids && date)) return res.status(400).json("provide data");
      // update each user by his penalty
      ids.map(async (id) => {
        let employee = await Employee.findOne({ where: { emp_id: id } });
        //make sure employee exist
        if (!employee) return res.status(400).json("لايوجد مستخدمين الان");
        //update employee
        let newDates = employee.absent_date.concat(date);
        employee.update(
          {
            absent_date: newDates,
            attendee_count_M: Sequelize.literal("attendee_count_M + 1"),
            attendee_count_Y: Sequelize.literal("attendee_count_Y + 1"),
            salary: employee.salary - employee.penalty,
          },
          { where: { emp_id: id } }
        );
      });
      //send response
      res.json("updated the employees successfully");
    } catch (error) {
      if (error) throw error;
    }
  },
  nwMonth: async (req, res) => {
    try {
      //find all employees
      let employees = await Employee.findAll();

      //map and update each employee
      employees.map((employee) => {
        employee.update(
          {
            salary: employee.start_salary,
            attendee_count_M: 0,
            attendee_count_Y: 0,
            absent_date: [],
          },
          { wher: { emp_id: employee.emp_id } }
        );
      });

      //send successfull response to front
      res.json("تم تفعيل بداية الشهر بنجاح");
    } catch (error) {
      if (error) throw error;
    }
  },
  borrow: async (req, res) => {
    try {
      let { emp_name, amount } = req.body;

      //find and update salary from db
      let employee = await Employee.findOne({ where: { emp_name } });

      //if amount is bigger than half the salary reject
      if (amount > employee.salary / 2) {
        return res.status(400).json("عذرا تم تجاوز الحد المسموح به");
      }
      //update employee
      employee.salary = employee.salary - amount;
      await employee.save();

      //save deduct data
      const newDeduct = await Deduct.create({
        amount,
        employeeEmpId: employee.emp_id,
      });

      res.json({ employee, newDeduct });
    } catch (error) {
      if (error) throw error;
    }
  },
};

module.exports = attend;
