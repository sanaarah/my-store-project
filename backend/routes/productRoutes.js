const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

//  Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});


router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json({ message: "Product added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
});

module.exports = router;
