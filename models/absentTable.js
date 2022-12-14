module.exports = (sequelize, DataTypes) => {
  let Absent = sequelize.define(
    "absent",
    {
      _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      emp_ids: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
    },
    { freezeTableName: true }
  );

  return Absent;
};
