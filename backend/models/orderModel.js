export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending"
      }
    },
    {
      tableName: "orders",
      timestamps: true,
    },
  );

  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, {
      as: "orderItems",
      foreignKey: "orderId",
    });
    Order.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId",
    });
  };
  return Order;
};
