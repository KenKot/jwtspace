"use strict";

const models = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const friendships = [];

    for (let i = 2; i < 5; i++) {
      friendships.push({
        requestorId: i,
        requesteeId: 1,
        status: "accepted",
      });
    }

    //user 5 invited me
    friendships.push({
      requestorId: 5,
      requesteeId: 1,
      status: "pending",
    });

    //I invited user 6
    friendships.push({
      requestorId: 1,
      requesteeId: 6,
      status: "pending",
    });

    //they rejected my request
    friendships.push({
      requestorId: 1,
      requesteeId: 7,
      status: "rejected",
    });

    //I rejected their request
    friendships.push({
      requestorId: 8,
      requesteeId: 1,
      status: "rejected",
    });

    return queryInterface.bulkInsert("Friendships", friendships);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      "Friendships",
      null,
      {},
      models.Friendship
    );
  },
};
