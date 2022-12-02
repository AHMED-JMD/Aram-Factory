const db = require("../../models/index");
const xssFilter = require("xss-filters");
const { Sequelize } = require("sequelize");

const Employee = db.models.Employee;
const Deduct = db.models.Deduct;

const attend = {
  absent: async (req, res) => {
    try {
      const { ids, date } = req.body;

      //make sure ids are given
      if (!(ids && date)) return res.status(400).json("provide data");
      // update each user by his penalty
      ids.map(async (id) => {
        let employee = await Employee.findOne({ where: { emp_id: id } });
        //make sure employee exist
        // if (!employee) return res.status(400).json("لايوجد مستخدمين الان");
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
            salary: employee.fixed_salary,
            warnings: 0,
            attendee_count_M: 0,
            attendee_count_Y: 0,
            absent_date: [],
          },
          { where: { emp_id: employee.emp_id } }
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
      let { emp_id, amount, date } = req.body;

      //find and update salary from db
      let status;
      Promise.all(
        emp_id.map(async (id) => {
          let employee = await Employee.findOne({ where: { emp_id: id } });

          //if amount is bigger than half the salary reject
          if (amount > employee.salary / 2) {
            return (status = 400);
          } else {
            //update employee
            employee.salary = employee.salary - amount;
            await employee.save();

            //save deduct data
            let newDeduct = await Deduct.create({
              amount,
              date,
              employeeEmpId: employee.emp_id,
            });
            return (status = 200);
          }
        })
      )
        .then((response) => {
          console.log(response);
          if (response === [200]) {
            res.json("Ok");
          } else {
            res.status(response[0]).json("عفوا تم تجاوز الحد المسموح به");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      if (error) throw error;
    }
  },
  warn: async (req, res) => {
    try {
      let { emp_ids } = req.body;

      //map and find from database
      let status;
      Promise.all(
        emp_ids.map(async (emp_id) => {
          //find and see how many warning he has
          let newEmp = await Employee.findOne({ where: emp_id });
          if (newEmp.warnings >= 2) {
            newEmp.isWarned = true;
            newEmp.save();
            return (status = 400);
          } else {
            //update
            await newEmp.update(
              {
                warnings: Sequelize.literal("warnings + 1"),
              },
              { where: { emp_id } }
            );
            return (status = 200);
          }
        })
      )
        .then((response) => {
          console.log(response);
          if (response === [200]) {
            res.json("Ok");
          } else {
            res.status(response[0]).json("الموظف لديه ثلاثة انذارات");
          }
        })
        .catch((err) => {
          if (err) throw err;
          console.log(err);
        });
    } catch (error) {
      if (error) throw error;
      console.log(error);
    }
  },
};

module.exports = attend;
