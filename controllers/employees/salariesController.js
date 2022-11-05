const db = require("../../models/index");
const xssFilter = require("xss-filters");

const Checkout = db.models.Checkout;
const Employee = db.models.Employee;
const Grants = db.models.Grants;

const checkout = {
  add: async (req, res) => {
    try {
      let { date, total } = req.body;
      //check request
      if (!(date && total))
        return res.status(400).json("please provide all data");

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
