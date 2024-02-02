const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");
const {
  getFriendshipStatus,
  getFriendshipRequests,
  removeFriend,
} = require("../controllers/friendshipsController");
const router = express.Router();

router.get("/requests", verifyJWT, getFriendshipRequests);
router.get("/:id", verifyJWT, getFriendshipStatus);

//accept their friend request
// router.get("/:id/accept", verifyJWT, getFriendshipStatus);

//cancel the request I sent
// router.get("/:id/cancel", verifyJWT, getFriendshipStatus);

//delete friend
router.get("/:id/remove", verifyJWT, removeFriend);

module.exports = router;
