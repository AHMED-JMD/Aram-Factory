module.exports = (sequelize, DataTypes) => {
  const employee = sequelize.define(
    "employees",
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
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imgLink: {
        type: DataTypes.STRING,
      },
      attendee_count_M: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      attendee_count_Y: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      absent_date: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
      notes: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      freezTableName: true,
    }
  );

  return employee;
};
