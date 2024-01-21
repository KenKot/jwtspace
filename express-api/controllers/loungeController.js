const asyncHandler = require("express-async-handler");

const getUserLoungeMessages = asyncHandler(async (req, res) => {
  console.log("getUserLoungeMessages fired ");
  console.log("req: ", req.roles);
  res.json({message: "user lounge"});
});

const getModLoungeMessages = asyncHandler(async (req, res) => {
  res.json({message: "mod lounge"});
});

const getAdminLoungeMessages = asyncHandler(async (req, res) => {
  res.json({message: "admin lounge"});
});

module.exports = {
  getAdminLoungeMessages,
  getUserLoungeMessages,
  getAdminLoungeMessages,
};
