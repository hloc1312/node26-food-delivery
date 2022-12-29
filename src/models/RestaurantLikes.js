const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "RestaurantLikes",
    {
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      restaurantId: {
        type: DataTypes.INTEGER,
        field: "restaurant_id",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "restaurant_likes",
      // disable createdAt, updatedAt
      timestamps: false,
    }
  );
};
