const pool = require('../db');

// DRY
const baseQuery = `
  SELECT p.*, c.name AS category_name, e.name AS era_name, col.name AS color_name, cond.name AS condition_name 
  FROM products p 
  JOIN categories c ON p.category_id = c.id
  JOIN eras e ON p.era_id = e.id
  JOIN colors col ON p.color_id = col.id
  JOIN conditions cond ON p.condition_id = cond.id
`;

// Get All Products
async function getAllProducts({ onlyPublished = false } = {}) {
let query = baseQuery;

if (onlyPublished) {
    query += ' WHERE published_date <= NOW()';
}

const result = await pool.query(query);
return result.rows;

}

// Get Product by Slug
async function getProductBySlug(slug) {
   let query = baseQuery + ' WHERE p.slug = $1 AND published_date <= NOW();';

const result = await pool.query(query, [slug]);
return result.rows[0];
}

// search products
async function searchProducts(searchTerm) {
    const query = baseQuery + ' WHERE p.name ILIKE $1 AND published_date <= NOW()';
    const pattern = `%${searchTerm}%`;

    const result = await pool.query(query, [pattern]);
    return result.rows;
}

// delete product
async function deleteProduct(id) {
    const query = ' DELETE FROM products WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount;
}

module.exports = { getAllProducts, getProductBySlug, searchProducts, deleteProduct };