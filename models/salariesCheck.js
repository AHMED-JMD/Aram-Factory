module.exports = (sequelize, DataTypes) => {
  let Checkout = sequelize.define(
    "checkout",
    {
      _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      emp_names: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
      emp_salaries: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
    },
    { freezeTableName: true }
  );

  return Checkout;
};
