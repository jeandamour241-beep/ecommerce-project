export default (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "cartItems",
      timestamps: true,
    },
  );

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Product, {
      as: "product",
      foreignKey: "productId",
    });

    CartItem.belongsTo(models.Cart, {
      as: "cart",
      foreignKey: "cartId",
    });
  };

  return CartItem;
};
