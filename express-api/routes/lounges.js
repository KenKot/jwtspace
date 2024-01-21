const express = require("express");
const router = express.Router();

const loungeController = require("../controllers/loungeController");

const verifyRoles = require("../middleware/verifyRoles");

router.get(
  "/userlounge",
  //   verifyRoles(["users", "moderator", "admin"]),
  verifyRoles("user"),
  loungeController.getUserLoungeMessages
);
// router.get(
//   "/modlounge",
//   verifyRoles(["moderator", "admin"]),
//   loungeController.getModLoungeMessages
// );
// router.get(
//   "/adminlounge",
//   verifyRoles(["admin"]),
//   loungeController.getAdminLoungeMessages
// );

module.exports = router;
