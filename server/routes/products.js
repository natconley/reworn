const express = require('express');
const router = express.Router();
const { getAllProducts, getProductBySlug } = require('../repositories/productRepository');

router.get('/', async (req, res) => {
    try {
      const products = await getAllProducts();
res.json(products);  
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.get('/:slug', async (req, res) => {
    try {
        const slug = req.params.slug;
        const product = await getProductBySlug(slug);
         if (!product) {
            res.status(404).json({ error: 'Product could not be found' });
        } else {
        res.json(product);
       }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});


module.exports = router;