const db = require("../../models/index");

const Employee = db.models.Employee;
const Deduct = db.models.Deduct;

const Borrowed = {
  post: async (req, res) => {
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
            await Deduct.create({
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
  get: async (req, res) => {
    try {
      let newDeduct = await Deduct.findAll({ include: Employee });
      res.json(newDeduct);
    } catch (err) {
      if (err) throw err;
    }
  },
  deleteAll: async (req, res) => {
    try {
      let { ids } = req.body;

      //delete from db
      let deletedBorr = await Deduct.destroy({ where: {id: ids} });

      res.json(deletedBorr);
    } catch (err) {
      if (err) throw err;
    }
  },
  return: async (req, res) => {
    try {
      let { id, nwAmount } = req.body;

      if (!(id && nwAmount)) return res.status(400).json("provide id ");

      //find and update deduct
      let nwDeduct = await Deduct.findOne({ where: { id } });
      //make sure nwAmount is not bigger than real amoun
      if (nwAmount > nwDeduct.amount) return res.status(400).json("عذرا القيمة اكبر من السلفية");

      //update db
      nwDeduct.amount = nwDeduct.amount - nwAmount;
      nwDeduct.save();

      //update employee salary
      let employ = await Employee.findOne({
        where: { emp_id: nwDeduct.employeeEmpId },
      });
      employ.salary = employ.salary + nwAmount;
      employ.save()
      //response to backend
      res.json(employ);
    } catch (err) {
      if (err) throw err;
    }
  },
};

module.exports = Borrowed;
