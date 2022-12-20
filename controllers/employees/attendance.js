const db = require("../../models/index");
const xssFilter = require("xss-filters");
const { Sequelize, where } = require("sequelize");

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
      let absent_ids = [];
      Promise.all(
        ids.map(async (id) => {
          let employee = await Employee.findOne({ where: { emp_id: id } });
          // make sure employee exist
          if (!employee) return res.status(400).json("لايوجد مستخدمين الان");

          //make sure no employee is recorded twice in an absent table
          let absentTable = await Absent.findOne({ where: { date } });
          if (absentTable) {
            let result = absentTable.emp_ids.includes(employee.emp_id);

            if (result === true) {
              return (obj = { status: 400, data: employee.emp_name });
            } else {
              //update ids of the same schedule
              absent_ids.push(employee.emp_id);
              let nwabsentids = absentTable.emp_ids.concat(absent_ids);

              //update db
              await Absent.update(
                { emp_ids: nwabsentids },
                { where: { date } }
              );

              //return response
              return (obj = {
                status: 401,
                data: "تم اضافة الموظف للقائمة بنجاح",
              });
            }
          } else {
            //push employee id to employee array in schedule schema
            absent_ids.push(employee.emp_id);

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
        } else if (obj[0].status === 401) {
          res.json(`${obj[0].data}`);
        } else {
          //create new absent table
          console.log(absent_ids);
          Absent.create({
            date,
            emp_ids: absent_ids,
          }).then((response) => {
            res.json(response);
          });
        }
      });
    } catch (error) {
      if (error) throw error;
    }
  },
  multiAbsent: async (req, res) => {
    try {
      const { ids, dates } = req.body;

      //make sure ids are given
      if (!(ids && dates)) return res.status(400).json("provide data");

      // update each user by his penalty
      let obj;
      Promise.all(
        ids.map(async (id) => {
          let employee = await Employee.findOne({ where: { emp_id: id } });
          // make sure employee exist
          if (!employee) return res.status(400).json("لايوجد مستخدمين الان");

          //map throw dates and chech if the schedule exist update it else create new one
          return Promise.all(
            dates.map(async (date) => {
              //make sure no employee is recorded twice in an absent table
              let absentTable = await Absent.findOne({ where: { date } });
              if (absentTable) {
                let result = absentTable.emp_ids.includes(employee.emp_id);

                if (result === true) {
                  return (obj = { status: 400, data: employee.emp_name });
                } else {
                  //update ids of the same schedule
                  let absent_ids = [];

                  absent_ids.push(employee.emp_id);
                  let nwabsentids = absentTable.emp_ids.concat(absent_ids);
                  console.log(nwabsentids);
                  //update db
                  await Absent.update(
                    { emp_ids: nwabsentids },
                    { where: { date } }
                  );

                  //return response
                  return (obj = {
                    status: 401,
                    data: "تم اضافة الموظف للقائمة بنجاح",
                  });
                }
              } else {
                //push employee id to employee array in schedule schema and Create New Schedule
                let newId = [];
                newId.push(employee.emp_id);
                //create new absent table
                await Absent.create({
                  date,
                  emp_ids: newId,
                });

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
          );
        })
      ).then((obj) => {
        //response on error employ exist in the schedule
        if (obj[0][0].status === 400) {
          res
            .status(obj[0][0].status)
            .json(`${obj[0][0].data} موجود في قائمة الغياب الحالية`);
        } else if (obj[0][0].status === 401) {
          res.json(`${obj[0][0].data}`);
        } else {
          res.status(obj[0][0].status).json(obj[0][0].data);
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
        // //find employees by their names
        // let employee = await Employee.findAll({
        //   where: { emp_id: nwTable.emp_ids },
        // });

        //send successful respond
        return res.json(nwTable);
      } else {
        return res.status(400).json(`القائمة غير موجودة لهذا اليوم`);
      }
    } catch (err) {
      if (err) throw err;
    }
  },
  deleteOne: async (req, res) => {
    try {
      let { date, emp_id } = req.body;

      if (!emp_id) return res.status(400).json("enter all feilds");

      //find by date and filter schedule by emp_id
      let AbsTable = await Absent.findOne({ where: { date } });

      //filter and save the table
      let newArr = AbsTable.emp_ids;

      //get the index and splice
      let index = newArr.indexOf(emp_id);
      let x = newArr.splice(index, 1);

      console.log(newArr, x);

      //save and send response
      await Absent.update(
        {
          emp_ids: newArr,
        },
        { where: { date } }
      );
      //send to back
      res.send(AbsTable);
    } catch (err) {
      if (err) throw err;
    }
  },
};

module.exports = attend;
