module.exports = (sequelize, DataTypes) => {
  let Archive = sequelize.define(
    "archive",
    {
      emp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      emp_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Ssn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_salary: {
        type: DataTypes.INTEGER,
      },
      penalty: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      phoneNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      app_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      warnings: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    { freezeTableName: true }
  );

  return Archive;
};
