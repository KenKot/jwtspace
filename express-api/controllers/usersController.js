// const express = require("express");
// const app = express.Router();

const models = require("../models");
const User = models.User;
const Profile = models.Profile;

// GET ONE USER
const getUsers = async (req, res) => {
  const users = await User.findAll({ attributes: ["username", "id"] });
  res.send({ users });
};

// GET ALL USERS
const getUserProfileById = async (req, res) => {
  const { id } = req.params;

  const userProfile = await User.findByPk(id, {
    include: [
      {
        model: Profile,
      },
    ],
    attributes: ["username", "firstName", "lastName", "birthday"],
  });
  console.log(userProfile);
  res.send({ userProfile });
};

module.exports = { getUsers, getUserProfileById };
