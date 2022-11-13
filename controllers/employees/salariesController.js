const db = require("../../models/index");
const xssFilter = require("xss-filters");

const Checkout = db.models.Checkout;
const Employee = db.models.Employee;
const Grants = db.models.Grants;

const checkout = {
  add: async (req, res) => {
    try {
      let { date, total } = req.body;
      console.log(req.body);
      //check request
      if (!(date && total))
        return res.status(400).json("please provide all data");

      //find all employees net salaries and names
      let emp_names = [];
      let net_salaries = [];
      let newEmployee = await Employee.findAll({ include: Grants });
      //map throw data
      newEmployee.map((employee) => {
        let salary =
          employee.salary +
          employee.grant.extra +
          employee.grant.grant17 +
          employee.grant.grant19 +
          employee.grant.grant20 +
          employee.grant.grant22 +
          employee.grant.grantGM -
          employee.grant.insurance;

        net_salaries.push(salary);
        emp_names.push(employee.emp_name);
      });

      //add new checkouts
      let newCheckout = await Checkout.create({
        total,
        date,
        emp_names,
        emp_salaries: net_salaries,
      });
      res.json(newCheckout);
    } catch (error) {
      if (error) throw error;
    }
  },
  view: async (req, res) => {
    try {
      //find all users and their related checkouts
      let result = await Checkout.findAll();
      res.json(result);
    } catch (error) {
      if (error) throw error;
    }
  },
  viewOne: async (req, res) => {
    let { id } = req.body;
    console.log(id);
    if (!id) return res.status(400).json("provide id");

    //find and return One from db
    let newCheckout = await Checkout.findOne({ where: { _id: id } });

    res.json(newCheckout);
  },
  viewSchedule: async (req, res) => {
    try {
      //calculate total and find all employees
      let net = [];
      let newEmployee = await Employee.findAll({ include: Grants });

      newEmployee.map((employee) => {
        let salary =
          employee.salary +
          employee.grant.extra +
          employee.grant.grant17 +
          employee.grant.grant19 +
          employee.grant.grant20 +
          employee.grant.grant22 +
          employee.grant.grantGM -
          employee.grant.insurance;

        net.push(salary);
      });
      //total sum is here
      const total = net.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);

      res.json({ newEmployee, total });
    } catch (error) {
      if (error) throw error;
    }
  },
};

module.exports = checkout;
