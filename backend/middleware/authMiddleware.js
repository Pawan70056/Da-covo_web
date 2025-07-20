const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Single import for User model
const errorHandler = require("../utils/errorHandler");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("🔑 Auth Header:", authHeader);
    console.log("🔐 JWT_SECRET:", process.env.JWT_SECRET);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(errorHandler(401, "Unauthorized Access."));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(errorHandler(401, "Unauthorized Access - Token missing."));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Decoded:", decoded);

    const user = await User.findById(decoded.id).select("_id");
    if (!user) {
      return next(errorHandler(401, "User not found."));
    }

    req.user = user;
    next();

  } catch (err) {
    console.error("❌ JWT Error:", err.message);
    // If token expired or invalid, return 'Please Login.'
    return next(errorHandler(401, "Please Login."));
  }
};

module.exports = authMiddleware;
