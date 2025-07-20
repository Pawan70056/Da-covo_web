const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const cloudinary = require("../utils/cloudinary");

const router = express.Router();

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", // You can rename to 'products' or 'images' as per your use
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: "limit" }]
  },
});

const upload = multer({ storage });
upload.single("product")


// Routes
router.get("/", productController.getAllProducts);
router.post("/", authMiddleware, upload.single("product"), productController.createProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);
router.get("/newCollections", productController.getNewCollections);
router.get("/popularInWomen", productController.getPopularInWomen);

module.exports = router;
