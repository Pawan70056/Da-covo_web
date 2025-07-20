// const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const errorHandler = require("../utils/errorHandler");

// Utility: Validate that the SECRET_KEY exists
const getSecretKey = () => {
  if (!process.env.SECRET_KEY) {
    throw new Error("❌ SECRET_KEY is missing from environment variables.");
  }
  return process.env.SECRET_KEY;
};

// 🔐 Signup user
exports.signupUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Basic validation
    if (!name || !email || !password) {
      return next(errorHandler(400, "Name, email and password are required!"));
    }

    if (!validator.isEmail(email)) {
      return next(errorHandler(400, "Email is not valid!"));
    }

    if (!validator.isStrongPassword(password)) {
      return next(
        errorHandler(
          400,
          "Please use a strong password (min 8 chars, uppercase, lowercase, number, symbol)."
        )
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "Email already in use."));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Prepare default cart structure
    const cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      cartData: cart,
    });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, getSecretKey(), {
      expiresIn: "360d",
    });

    res.status(201).json({ success: true, token, role: user.role });
  } catch (err) {
    next(err);
  }
};

// 🔑 Login user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // rest of login logic...
  } catch (err) {
    next(err);
  }
};
