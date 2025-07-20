const express = require("express");
const router = express.Router();

const { registerUser, loginController } = require("../controllers/authControllers");

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginController);

module.exports = router;
