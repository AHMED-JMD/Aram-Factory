module.exports = (sequelize, DataTypes) => {
  let Deduct = sequelize.define(
    "deduct",
    {
      amount: DataTypes.INTEGER,
    },
    { freezeTableName: true }
  );

  return Deduct;
};
