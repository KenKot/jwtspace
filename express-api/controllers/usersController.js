const models = require("../models");
const User = models.User;
const Profile = models.Profile;

const asyncHandler = require("express-async-handler");

// DESCRIPT: get all users
// ROUTE: /
// ACCESS: public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({ attributes: ["username", "id"] });
  res.send({ users });
});

// DESCRIPT: get one user (w/ their profile)
// ROUTE: /users/:id
// ACCESS: public
const getUserProfileById = asyncHandler(async (req, res) => {
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
});

// DESCRIPT: get user's friendlist
// ROUTE: /users/:id/friends
// ACCESS: public
const getUserFriends = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  const friends = await user.fetchFriends();

  res.send({ friends });
});

module.exports = { getUsers, getUserProfileById, getUserFriends };
