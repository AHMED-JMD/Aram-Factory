const db = require("../../models/index");

let Archive = db.models.Archive;

const archive = {
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
        app_date,
        start_date,
        address,
        warnings,
      } = req.body;
      //add to db
      let newArchive = await Archive.create({
        emp_id,
        emp_name,
        Ssn,
        jobTitle,
        salary,
        start_salary: salary,
        penalty,
        phoneNum,
        app_date,
        start_date,
        address,
        warnings,
      });
      //send to back
      res.json(newArchive);
    } catch (error) {
      if (error) throw error;
      console.log(error);
    }
  },
  view: async (req, res) => {
    try {
      //find all Archived employees from db
      let allArchived = await Archive.findAll({});
      //send to back end
      res.json(allArchived);
    } catch (error) {
      if (error) throw error;
      console.log(error);
    }
  },
};

module.exports = archive;
