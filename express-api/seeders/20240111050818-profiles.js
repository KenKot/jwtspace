"use strict";
const models = require("../models");
const User = models.User;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const profiles = [];

    for (let i = 1; i <= 10; i++) {
      profiles.push({
        userId: i,
        about: `About user ${i}!`,
        desiredMeets: `Desired meets for user ${i}`,
        mood: `Mood of user ${i}`,
        quote: `Favorite quote of user ${i}`,
        generalInterests: `General interests of user ${i}`,
        musicInterests: `Music interests of user ${i}`,
        movieInterests: `Movie interests of user ${i}`,
        televisionInterests: `Television interests of user ${i}`,
        bookInterests: `Book interests of user ${i}`,
        heroesInterests: `Heroes interests of user ${i}`,
        instagramLink: `instagram.com/user${i}`,
        twitterLink: `twitter.com/user${i}`,
        twitchLink: `twitch.tv/user${i}`,
        githubLink: `github.com/user${i}`,
        mastodonLink: `mastodon.social/@user${i}`,
        websiteLink: `user${i}.com`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("Profiles", profiles);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Profiles", null, {});
  },
};
