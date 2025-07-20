const Product = require("./../models/productModel");
const fs = require("fs");
require("dotenv").config({ path: "./config.env" });
const cloudinary = require('./../utils/cloudinary');

const backend_url = process.env.BACKEND_URL;

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, category, new_price, old_price } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, error: "Image is required." });
    }

    const imagePath = req.file.path;

    // Create and save product
    const newProduct = new Product({
      name,
      category,
      new_price,
      old_price,
      image: imagePath,
    });

    await newProduct.save();

    res.status(201).json({ success: true, message: "Product created", product: newProduct });
  } catch (err) {
    console.error("❌ Product creation error:", err);
    next(err);
  }
};


exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ id });
    // Delete the image from Cloudinary 
    const imageId = product.image.split('/').pop().split('.')[0]; 
    await cloudinary.uploader.destroy(imageId);
    await Product.findOneAndDelete({ id });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.getNewCollections = async (req, res, next) => {
  try {
    const products = await Product.find({});
    const newCollection = products.slice(-8);
    res.status(200).json(newCollection);
  } catch (err) {
    next(err);
  }
};

exports.getPopularInWomen = async (req, res, next) => {
  try {
    const products = await Product.find({ category: "women" });
    const popularInWomen = products.slice(0, 4);
    res.status(200).json(popularInWomen);
  } catch (err) {
    next(err);
  }
};
