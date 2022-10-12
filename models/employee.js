module.exports = (sequelize, DataTypes) => {
  const employee = sequelize.define(
    "employees",
    {
      employee_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
      },
      Ssn: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      imgLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      secondName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thirdName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
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
