"use strict";
const models = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userRoles = [];

    for (let i = 1; i < 11; i++) {
      userRoles.push({
        userId: i,
        roleId: 1,
      });
    }

    return queryInterface.bulkInsert("UserRoles", userRoles);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("UserRoles", null, {}, models.UserRoles);
  },
};
