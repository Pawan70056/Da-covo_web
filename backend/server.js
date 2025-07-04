// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");

const connectDB = require("./db");

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json()); // Parse JSON bodies

// Enable CORS - adjust origin as needed
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
}));

// Serve static images with absolute path
app.use("/images", express.static(path.join(__dirname, "upload/images")));

// API routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/subscribers", subscriberRoutes);

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: "API endpoint not found" });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

// Connect to DB and start server
connectDB()
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1); // Exit if DB connection fails
  });
