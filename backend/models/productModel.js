export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_public_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "products",
      timestamps: true,
    },
  );

  Product.associate = (models) => {
    Product.hasMany(models.CartItem, {
      foreignKey: "productId",
      as: "cartItems",
    });
    Product.hasMany(models.OrderItem, {
      foreignKey: "productId",
      as: "orderItem",
    });
  };

  return Product;
};
