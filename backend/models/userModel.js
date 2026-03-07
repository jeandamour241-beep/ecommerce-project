export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Order, {
      as: "order",
      foreignKey: "userId",
    });
    User.hasOne(models.Cart, {
      as: "cart",
      foreignKey: "userId",
    });
  };

  return User;
};
