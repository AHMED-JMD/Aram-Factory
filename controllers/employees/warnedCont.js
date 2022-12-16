const db = require("../../models/index");
const Sequelize = require("sequelize");
const Employee = db.models.Employee;

const Expelled = {
  warn: async (req, res) => {
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
  },
  get: async (req, res) => {
    try {
      //add employees to database
      let newEmployees = await Employee.findAll({ where: { isWarned: true } });
      
      //make sure there is employees
      if(!newEmployees){
        return res.status(400).json('no employees now')
      }
      res.json(newEmployees);
    } catch (err) {
      if (err) throw err;
    }
  },
  return : async (req, res) =>{
    try {
      let { emp_ids } = req.body;
      console.log(emp_ids);
      //update all

      let newUser = await Employee.update(
        { isWarned: false },
        { where: { emp_id: emp_ids } }
      );
      res.json(newUser);
    } catch (error) {
      if (error) throw error;
      console.log(error);
    }
  }
};

module.exports = Expelled;
