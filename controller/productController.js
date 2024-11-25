const Product = require('../model/productModel');

// Fetch all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the database
        res.status(200).json({ products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};