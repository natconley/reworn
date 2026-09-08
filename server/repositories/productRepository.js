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

// add product
async function addProduct(productData) {
    const query = ` INSERT INTO products (name, description, image_url, sku, price, slug, published_date, size, category_id, era_id, color_id, condition_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
    RETURNING * `;
    const values = [productData.name, productData.description, productData.image_url, productData.sku, productData.price, productData.slug, productData.published_date, productData.size, productData.category_id, productData.era_id, productData.color_id, productData.condition_id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

// similar products
async function getSimilarProducts(categoryId, eraId, excludeId) {
    const query = baseQuery + ' WHERE p.category_id = $1 AND p.id != $2 AND published_date <= NOW()';
    const result = await pool.query(query, [categoryId, excludeId]);

    if (result.rows.length <= 5) {
        const fallbackQuery = baseQuery + ' WHERE (p.category_id = $1 OR p.era_id = $2) AND p.id != $3 AND published_date <= NOW()';
        const fallbackResult = await pool.query(fallbackQuery, [categoryId, eraId, excludeId]);
        return fallbackResult.rows;
    } 

    return result.rows;
}

// get cateogry, color, era, condition
async function getCategoryTables(tableName) {
        const result = await pool.query(`SELECT * FROM ${tableName}`);
        return result.rows;
}

module.exports = { getAllProducts, getProductBySlug, searchProducts, deleteProduct, addProduct, getSimilarProducts, getCategoryTables };