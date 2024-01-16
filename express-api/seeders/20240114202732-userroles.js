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

      //bob1 to test admin (role id's: 1,2,3)
      //bob2 to test mod  (role id's: 1,2)

      if (i === 1) {
        userRoles.push({
          userId: i,
          roleId: 2,
        });
        userRoles.push({
          userId: i,
          roleId: 3,
        });
      }
      if (i === 2) {
        userRoles.push({
          userId: i,
          roleId: 2,
        });
      }
    }

    return queryInterface.bulkInsert("UserRoles", userRoles);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("UserRoles", null, {}, models.UserRoles);
  },
};
