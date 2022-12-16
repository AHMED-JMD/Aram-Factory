const db = require("../../models/index");
const xssFilter = require("xss-filters");
const { Sequelize } = require("sequelize");

const Employee = db.models.Employee;
const Absent = db.models.Absent;

const attend = {
  absent: async (req, res) => {
    try {
      const { ids, date } = req.body;

      //make sure ids are given
      if (!(ids && date)) return res.status(400).json("provide data");

      // update each user by his penalty
      let obj;
      let absent_names = [];
      Promise.all(
        ids.map(async (id) => {
          let employee = await Employee.findOne({ where: { emp_id: id } });
          // make sure employee exist
          if (!employee) return res.status(400).json("لايوجد مستخدمين الان");

          //make sure no employee is recorded twice in an absent table
          let absentTable = await Absent.findOne({ where: { date } });
          if (absentTable) {
            let result = absentTable.emp_names.includes(employee.emp_name);

            if (result === true) {
              return (obj = { status: 400, data: employee.emp_name });
            } else {
              absentTable.emp_names.push(employee.emp_name);
              absentTable.save();
              console.log(absentTable.emp_names, absentTable.date);
              return (obj = {
                status: 400,
                data: "تم اضافة الموظف للقائمة بنجاح",
              });
            }
          } else {
            //push employee name to employee array
            absent_names.push(employee.emp_name);

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

            return (obj = { status: 200, data: "success" });
          }
        })
      ).then((obj) => {
        if (obj[0].status === 400) {
          res
            .status(obj[0].status)
            .json(`${obj[0].data} موجود في قائمة الغياب الحالية`);
        } else {
          //create new absent table
          console.log(absent_names);
          Absent.create({ date, emp_names: absent_names }).then((response) => {
            res.json(response);
          });
        }
      });
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
  deleteAll: async (req, res) => {
    let deleted = await Absent.destroy({ where: {}, truncate: true });
    res.json(deleted);
  },
  findByDate: async (req, res) => {
    try {
      let { date } = req.body;
      //make sure date is there
      if (!date) return res.status(400).json("provide valid date");

      //find from absent table by date
      let nwTable = await Absent.findAll({});
      if (nwTable) {
        return res.json(nwTable);
      } else {
        return res.status(400).json("القائمة غير موجودة");
      }
    } catch (err) {
      if (err) throw err;
    }
  },
};

module.exports = attend;
