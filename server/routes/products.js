const express = require('express');
const router = express.Router();
const { getAllProducts, getProductBySlug, searchProducts, deleteProduct } = require('../repositories/productRepository');

// get all products
router.get('/', async (req, res) => {
    try {
      const products = await getAllProducts();
res.json(products);  
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// search product by name
router.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.search;
        const products = await searchProducts(searchTerm);
        res.json(products);
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// get product by slug
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

//delete product
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await deleteProduct(id);
        if (deletedCount === 0) {
            res.status(404).json({ error: 'No product was found to delete' });
        } else {
            res.status(200).json({ message: 'Product has been deleted' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
})




module.exports = router;