require("dotenv").config();
const Sequelize = require("sequelize");

//connecting to mysql
const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: process.env.DIALECT,
  }
);

//initializing db object holding db_connection && db_models
let db = {};
db.sequelize = sequelize;
db.models = {};
db.models.Admin = require("./admin")(sequelize, Sequelize.DataTypes);
db.models.Employee = require("./employee")(sequelize, Sequelize.DataTypes);

module.exports = db;
