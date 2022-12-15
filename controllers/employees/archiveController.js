const db = require("../../models/index");

let Employee = db.models.Employee;

const archive = {
  add: async (req, res) => {
    try {
      let { emp_ids } = req.body;
      console.log(emp_ids);
      //update all
      
      let newUser = await Employee.update(
        { isArchieved: true },
        { where: { emp_id: emp_ids } }
      );
      res.json(newUser);
    } catch (error) {
      if (error) throw error;
      console.log(error);
    }
  },
  return: async (req, res) => {
    try {
      let { emp_ids } = req.body;
      console.log(emp_ids);
      //update all

      let newUser = await Employee.update(
        { isArchieved: false },
        { where: { emp_id: emp_ids } }
      );
      res.json(newUser);
    } catch (error) {
      if (error) throw error;
      console.log(error);
    }
  },
  view: async (req, res) => {
    try {
      //find all Archived employees from db
      let allArchived = await Employee.findAll({
        where: { isArchieved: true },
      });
      //send to back end
      res.json(allArchived);
    } catch (error) {
      if (error) throw error;
      console.log(error);
    }
  },
};

module.exports = archive;
