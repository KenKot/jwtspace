"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      about: {
        type: Sequelize.STRING,
      },
      desiredMeets: {
        type: Sequelize.STRING,
      },
      mood: {
        type: Sequelize.STRING,
      },
      quote: {
        type: Sequelize.STRING,
      },
      generalInterests: {
        type: Sequelize.STRING,
      },
      musicInterests: {
        type: Sequelize.STRING,
      },
      movieInterests: {
        type: Sequelize.STRING,
      },
      televisionInterests: {
        type: Sequelize.STRING,
      },
      bookInterests: {
        type: Sequelize.STRING,
      },
      heroesInterests: {
        type: Sequelize.TEXT,
      },
      instagramLink: {
        type: Sequelize.STRING,
      },
      twitterLink: {
        type: Sequelize.STRING,
      },
      twitchLink: {
        type: Sequelize.STRING,
      },
      githubLink: {
        type: Sequelize.STRING,
      },
      mastodonLink: {
        type: Sequelize.STRING,
      },
      websiteLink: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Profiles");
  },
};
