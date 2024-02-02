"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile, {
        foreignKey: "userId",
      });

      User.belongsToMany(models.Role, {
        through: "UserRoles",
        foreignKey: "userId",
      });
      User.hasMany(models.Friendship, {
        as: "requestedFriendships",
        foreignKey: "requestorId",
      });

      User.hasMany(models.Friendship, {
        as: "receivedFriendships",
        foreignKey: "requesteeId",
      });
    }

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
    async fetchFriends() {
      try {
        const User = this.sequelize.model("User");

        const requestedFriendships = await this.getRequestedFriendships({
          where: { status: "accepted" },
          include: [
            {
              model: User,
              as: "requestee",
              attributes: ["id", "username"],
            },
          ],
        });

        const receivedFriendships = await this.getReceivedFriendships({
          where: { status: "accepted" },
          include: [
            {
              model: User,
              as: "requestor",
              attributes: ["id", "username"],
            },
          ],
        });

        const friends = [
          ...requestedFriendships.map((friendship) => friendship.requestee),
          ...receivedFriendships.map((friendship) => friendship.requestor),
        ];

        return friends;
      } catch (error) {
        console.error("Error fetching friends:", error);
        throw error;
      }
    }

    async fetchFriendRequests() {
      try {
        const User = this.sequelize.model("User");

        const receivedFriendships = await this.getReceivedFriendships({
          where: { status: "pending" },
          include: [
            {
              model: User,
              as: "requestor",
              attributes: ["id", "username"],
            },
          ],
        });

        const friends = [
          ...receivedFriendships.map((friendship) => friendship.requestor),
        ];

        return friends;
      } catch (error) {
        console.error("Error fetching friends:", error);
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
