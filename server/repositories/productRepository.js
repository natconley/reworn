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
    const query = baseQuery + ' WHERE (p.name ILIKE $1 OR p.size ILIKE $1 OR c.name ILIKE $1 OR e.name ILIKE $1 OR col.name ILIKE $1 OR cond.name ILIKE $1) AND published_date <= NOW()';
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
    const slug = await generateUniqueSlug(productData.name);
    const sku = await generateUniqueSku(productData.category_id);
    const values = [productData.name, productData.description, productData.image_url, sku, productData.price, slug, productData.published_date, productData.size, productData.category_id, productData.era_id, productData.color_id, productData.condition_id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

// helper functions for add product

// generates unique sku for addProduct
// not exported
async function generateUniqueSku(categoryId) {
const categoryResult = await pool.query('SELECT name FROM categories WHERE id = $1', [categoryId]);

const categoryName = categoryResult.rows[0].name;
const prefix = categoryName.slice(0, 3).toUpperCase();

const skuResult = await pool.query('SELECT sku FROM products WHERE sku ILIKE $1 ORDER BY sku DESC LIMIT 1',
    [`${prefix}%`]
    );

    let finalSku;

if (skuResult.rows.length === 0) {
    finalSku = prefix + "001";
} else {
    const numberPart = skuResult.rows[0].sku.slice(-3);
    const asNumber = parseInt(numberPart, 10);
    const nextNumber = asNumber + 1;
    const padded = String(nextNumber).padStart(3, '0');
    finalSku =  prefix + padded;
}
return finalSku;
}

// generates unique slug for addProduct
// not exported
async function generateUniqueSlug(name) {
    const baseSlug = slugify(name);

    const result = await pool.query('SELECT slug FROM products WHERE slug ILIKE $1', [`${baseSlug}%`]);
    const existingSlugs = result.rows.map(row => row.slug);

    if (!existingSlugs.includes(baseSlug)) {
        return baseSlug;
    } 
    let counter = 2;
    let newSlug = `${baseSlug}-${counter}`;

    while (existingSlugs.includes(newSlug)) {
        counter++;
        newSlug = `${baseSlug}-${counter}`;
    }

    return newSlug;
}

//helper function for generateUniqueSlug
function slugify(name) {
    return name
    .toLowerCase()
    // removes anything that is not a letter, number, space or dash
    .replace(/[^a-z0-9\s-]/g, '')  
    // replaces space with dash
    .replace(/\s+/g, '-');
}

/*-----end of add product functions-------*/ 



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