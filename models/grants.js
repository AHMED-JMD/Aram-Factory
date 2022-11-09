module.exports = (sequelize, DataTypes) => {
  let Grants = sequelize.define(
    "grants",
    {
      extra: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      grant17: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      grant19: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      grant20: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      grant22: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      grantGM: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      insurance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return Grants;
};
