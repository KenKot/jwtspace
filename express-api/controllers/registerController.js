const models = require("../models");
const User = models.User;
const Profile = models.Profile;
const UserRole = models.UserRole;

const bcrypt = require("bcrypt");
const sequelize = require("../config/database");

const asyncHandler = require("express-async-handler");

// DESCRIPT: create new user (w/ their profile)
// ROUTE: /register
// ACCESS: public
const createUserWithProfile = asyncHandler(async (req, res) => {
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

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password1 ||
      !password2 ||
      !birthday
    ) {
      return res.status(400).json({message: "All fields are required"});
    }

    // Check if user already exists
    const foundUser = await User.findOne({where: {email}});
    if (foundUser) {
      //409 code for "conflict"
      return res.status(409).json({error: "User already exists"});
    }

    // Check for password match
    if (password1 !== password2) {
      return res.status(400).json({error: "Passwords do not match"});
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
      {transaction: t}
    );

    const newProfile = await Profile.create(
      {
        userId: newUser.id,
      },
      {transaction: t}
    );

    const userRoles = await UserRole.create(
      {
        userId: newUser.id,
        roleId: 1, // 1 for 'user' permission/role
      },
      {transaction: t}
    );

    await t.commit();

    res.status(201).send({userId: newUser.id, message: "New user Created"});
    // res.status(201).send({userId: newUser.id});
  } catch (error) {
    // If an error is caught, we roll back the transaction.
    await t.rollback();

    res.status(400).send({
      error: "Unable to create user and profile",
      details: error.message,
    });
  }
});

module.exports = {createUserWithProfile};
