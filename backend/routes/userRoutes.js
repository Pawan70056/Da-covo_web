const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

// Use signupUser controller for both signup and register routes
router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);

module.exports = router;
