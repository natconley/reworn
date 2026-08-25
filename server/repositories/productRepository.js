const pool = require('../db');

async function getAllProducts({ onlyPublished = false } = {}) {
let query = `
SELECT p.*, c.name AS category_name, e.name AS era_name, col.name AS color_name, cond.name AS condition_name 
FROM products p 
JOIN categories c ON p.category_id = c.id
JOIN eras e ON p.era_id = e.id
JOIN colors col ON p.color_id = col.id
JOIN conditions cond ON p.condition_id = cond.id
`;

if (onlyPublished) {
    query += ' WHERE published_date <= NOW()';
}

const result = await pool.query(query);
return result.rows;

}

module.exports = { getAllProducts };