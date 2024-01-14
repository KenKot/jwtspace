"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }

  Profile.init(
    {
      about: DataTypes.STRING,
      desiredMeets: DataTypes.STRING,
      mood: DataTypes.STRING,
      quote: DataTypes.STRING,
      generalInterests: DataTypes.STRING,
      musicInterests: DataTypes.STRING,
      movieInterests: DataTypes.STRING,
      televisionInterests: DataTypes.STRING,
      bookInterests: DataTypes.STRING,
      heroesInterests: DataTypes.TEXT,
      instagramLink: DataTypes.STRING,
      twitterLink: DataTypes.STRING,
      twitchLink: DataTypes.STRING,
      githubLink: DataTypes.STRING,
      mastodonLink: DataTypes.STRING,
      websiteLink: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );

  return Profile;
};
