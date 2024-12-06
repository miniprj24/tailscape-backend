const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controller/productController');

const router = express.Router();

// GET all products
router.get('/', getAllProducts);

// POST create a new product (Admin Only)
router.post('/create-product', createProduct);

// PUT update a product (Admin Only)
router.put('/update-product/:id', updateProduct);

// DELETE remove a product (Admin Only)
router.delete('/delete-product/:id', deleteProduct);

module.exports = router;
