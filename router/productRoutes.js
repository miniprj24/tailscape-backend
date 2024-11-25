const express = require('express');
const { getAllProducts } = require('../controller/productController');

const router = express.Router();

// GET all products
router.get('/', getAllProducts);

module.exports = router;