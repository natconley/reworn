const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../repositories/productRepository');

router.get('/', async (req, res) => {
    try {
      const products = await getAllProducts();
res.json(products);  
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});


module.exports = router;