"use strict";

const models = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = [{name: "user"}, {name: "moderator"}, {name: "admin"}];

    return queryInterface.bulkInsert("Roles", roles);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Roles", null, {}, models.Role);
  },
};
