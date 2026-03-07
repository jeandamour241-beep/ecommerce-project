export default (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "cart",
      timestamps: true,
    },
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId",
    });
    Cart.hasMany(models.CartItem, {
      as: "cartItems",
      foreignKey: "cartId",
    });
  };

  return Cart;
};
