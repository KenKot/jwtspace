const models = require("../models");
const Friendship = models.Friendship;
const User = models.User;
const Sequelize = require("sequelize");

const asyncHandler = require("express-async-handler");

// DESCRIPT: get friendship status between 2 users
// ROUTE: /friendships/:id
// ACCESS: private
const getFriendshipStatus = asyncHandler(async (req, res) => {
  const authedUserId = req.user;
  const { id } = req.params;

  if (authedUserId == id) {
    //don't check if your friends w/ yourself
    return res.sendStatus(405);
  }

  const friendship = await Friendship.findOne({
    where: {
      [Sequelize.Op.or]: [
        { requestorId: authedUserId, requesteeId: id },
        { requestorId: id, requesteeId: authedUserId },
      ],
    },
    // attributes: ["status"],
  });

  console.log("getFriendshipStatus's friendship: ", friendship);
  res.json(friendship);
});

// DESCRIPT: get your incoming friend requests
// ROUTE: /friendships/requests
// ACCESS: private
const getFriendshipRequests = asyncHandler(async (req, res) => {
  const authedUserId = req.user;

  const incomingFriendRequests = await Friendship.findAll({
    where: { requesteeId: authedUserId, status: "pending" },
    include: [
      {
        model: User,
        as: "requestor",
        attributes: ["username"],
      },
    ],
  });

  // console.log("getFriendshipStatus's friendship: ", friendship);
  res.json(incomingFriendRequests);
});

// DESCRIPT: delete friend
// ROUTE: /friendships/:id/remove
// ACCESS: private
const removeFriend = asyncHandler(async (req, res) => {
  console.log("&&&&&&&& removeFriendfired");
  const authedUserId = req.user;
  let { id } = req.params;
  id = parseInt(id);
  // const authedUserId = 1;

  if (isNaN(id)) {
    return res.status(400).send("Invalid ID");
  }

  if (authedUserId == id) {
    return res.status(405).send("Can't remove yourself as a friend");
  }

  const friendship = await Friendship.findOne({ where: { requestorId: id } });
  if (!friendship) return res.status(404).send("No Friendship found");
  await friendship.update({ status: "rejected" });

  res.json({ message: "it worked" });
  // res.send("message sent successfully");
});

module.exports = { getFriendshipStatus, getFriendshipRequests, removeFriend };
