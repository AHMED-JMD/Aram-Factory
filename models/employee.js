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
      imgLink: {
        type: DataTypes.STRING,
      },
      warnings: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      attendee_count_M: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      attendee_count_Y: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isArchieved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isWarned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
