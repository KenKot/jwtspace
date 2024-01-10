"use strict";
const models = require("../models");
const User = models.User;
require("dotenv").config();

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    const hashedPassword = await bcrypt.hash(
      process.env.USER_SEED_PASSWORD,
      10
    );

    for (let i = 1; i < 11; i++) {
      users.push({
        email: `bob${i}@gmail.com`,
        password: hashedPassword,
      });
    }

    console.log(users);

    return queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {}, models.User);
  },
};
