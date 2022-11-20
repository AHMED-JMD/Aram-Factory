module.exports = (sequelize, DataTypes) => {
  const employee = sequelize.define(
    "employees",
    {
      emp_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      emp_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Ssn: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salary: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      start_salary: {
        type: DataTypes.BIGINT,
      },
      fixed_salary: {
        type: DataTypes.DOUBLE,
      },
      penalty: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      phoneNum: {
        type: DataTypes.BIGINT,
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
