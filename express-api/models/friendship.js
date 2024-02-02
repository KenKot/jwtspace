"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Friendship.belongsTo(models.User, {
        as: "requestor",
        foreignKey: "requestorId",
      });

      Friendship.belongsTo(models.User, {
        as: "requestee",
        foreignKey: "requesteeId",
      });
    }
  }

  Friendship.init(
    {
      requestorId: DataTypes.INTEGER,
      requesteeId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Friendship",
    }
  );
  return Friendship;
};
