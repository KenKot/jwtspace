const express = require("express");
const router = express.Router();

const loginLimiter = require("../middleware/loginLimiter");
const authController = require("../controllers/authController");

//LOGGIN IN ROUTE
router.post("/", loginLimiter, authController.login);

router.get("/refresh", authController.refresh);

// router.post("/logout", authController.logout);
router.get("/logout", authController.logout);

module.exports = router;
