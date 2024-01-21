const models = require("../models");
const User = models.User;
const Profile = models.Profile;

const asyncHandler = require("express-async-handler");

// DESCRIPT: edit user profile
// ROUTE: /users/:id/profile
// ACCESS: private
const editProfile = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const userId = id;

  //user id should be accessible on req.user
  //roles should be accessible on req.user

  console.log("edit profile from profilesController ran");

  const profile = await Profile.findOne({where: {userId}});
  if (!profile) {
    return res.status(404).json({message: "Profile not found"});
  }
  const updatedProfile = await profile.update({about: "it worked!"});

  res.send({updatedProfile});
});

module.exports = {editProfile};
