module.exports = (sequelize, DataTypes) => {
  const employee = sequelize.define(
    "employees",
    {
      emp_id: {
        type: DataTypes.INTEGER,
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
      phoneNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      imgLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      attendee_count_M: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      attendee_count_Y: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      absent_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezTableName: true,
    }
  );

  return employee;
};
