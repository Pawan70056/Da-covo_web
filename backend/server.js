require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // React frontend origin
  credentials: true,
}));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "upload/images")));

// ✅ Test route to confirm backend is working
app.get("/api/products", (req, res) => {
  res.json({ message: "✅ It works!" });
});

// Import routes (keep your custom routes)
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const authRoutes = require("./routes/authRoutes");

// Use routes
app.use("/api/products", productRoutes); // this will also accept POST from AddProduct
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "API endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB Connected");
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});
