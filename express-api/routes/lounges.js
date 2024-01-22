const express = require("express");
const router = express.Router();

const loungeController = require("../controllers/loungeController");

const verifyRoles = require("../middleware/verifyRoles");

const verifyJWT = require("../middleware/verifyJWT");

router.get(
  "/userlounge",
  verifyJWT,
  verifyRoles("user"),
  loungeController.getUserLoungeMessages
);
router.get(
  "/modlounge",
  verifyJWT,
  verifyRoles("moderator", "admin"),
  loungeController.getModLoungeMessages
);

router.get(
  "/adminlounge",
  verifyJWT,
  verifyRoles("admin"),
  loungeController.getAdminLoungeMessages
);

module.exports = router;
