const db = require("../../models/index");
const xssFilter = require("xss-filters");

const Checkout = db.models.Checkout;
const Employee = db.models.Employee;
const Grants = db.models.Grants;

const checkout = {
  add: async (req, res) => {
    try {
      let { date } = req.body;
      //check request
      if (!date) return res.status(400).json("please provide all data");

      //calculate net and total
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

      const total = net.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      //add new checkouts
      let newCheckout = await Checkout.create({ total, date });
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
  viewSchedule: async (req, res) => {
    try {
      let newEmployee = await Employee.findAll({ include: Grants });
      res.json(newEmployee);
    } catch (error) {
      if (error) throw error;
    }
  },
};

module.exports = checkout;
