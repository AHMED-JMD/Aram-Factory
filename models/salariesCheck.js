module.exports = (sequelize, DataTypes) => {
  let Checkout = sequelize.define(
    "checkout",
    {
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return Checkout;
};
