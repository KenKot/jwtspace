"use strict";

const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, {
        foreignKey: "userId",
      });

      User.belongsToMany(models.Role, {
        through: "UserRoles",
        foreignKey: "userId",
      });
    }
    // Instance method to get roles
    async fetchRoles() {
      try {
        // Calling Sequelize's built-in getRoles method
        const roles = await this.getRoles();
        return roles.map((role) => role.name);
      } catch (error) {
        console.error("Error fetching roles:", error);
        throw error;
      }
    }
  }

  User.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.STRING,
      birthday: DataTypes.DATE,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
