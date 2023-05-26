// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productsData = require('../models/products');

// Get all products
router.get('/', (req, res) => {
  const products = productsData;
  res.json(products);
});

module.exports = router;
