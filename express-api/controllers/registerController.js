// const express = require("express");
// const app = express.Router();

const models = require("../models");
const User = models.User;
const Profile = models.Profile;

const bcrypt = require("bcrypt");
const sequelize = require("../config/database");

// CREATE USER (W/ PROFILE)
const createUserWithProfile = async (req, res) => {
  //confirm matching passwords
  //user doesnt already exist

  const t = await sequelize.transaction(); // Start a new transaction

  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password1,
      password2,
      birthday,
    } = req.body;

    console.log("backend req.body: ", req.body);

    // Check if user already exists
    const foundUser = await User.findOne({ where: { email } });
    if (foundUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Check for password match
    if (password1 !== password2) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password1, 10);

    const newUser = await User.create(
      {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        birthday,
      },
      { transaction: t }
    );

    const newProfile = await Profile.create(
      {
        userId: newUser.id,
      },
      { transaction: t }
    );

    await t.commit();

    res.status(201).send({ userId: newUser.id });
  } catch (error) {
    // If an error is caught, we roll back the transaction.
    await t.rollback();

    res.status(400).send({
      error: "Unable to create user and profile",
      details: error.message,
    });
  }
};

module.exports = { createUserWithProfile };
