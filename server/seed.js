require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
     // Supabase kräver krypterad anslutning, struntar i verifiering pga projektets omfattning
    ssl: { rejectUnauthorized: false}
});


// build tables for category, color, era, condition
async function buildLookupMap(tableName) {
        const result = await pool.query(`SELECT * FROM ${tableName}`);
        const map = {};
        for (const row of result.rows) {
            map[row.name] = row.id;
        }
        return map;
}

// seed products from data/products.js
async function seedProducts(categoryMap, eraMap, colorMap, conditionMap) {
    const products = require('./data/products');

    for (const product of products) {
        const query = `
        INSERT INTO products (name, description, image_url, sku, price, slug, published_date, size, category_id, era_id, color_id, condition_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (slug) DO NOTHING
        `;
        const values = [
            product.name,
            product.description,
            product.image_url,
            product.sku,
            product.price,
            product.slug,
            product.published_date,
            product.size,
            categoryMap[product.category],
            eraMap[product.era],
            colorMap[product.color],
            conditionMap[product.condition]
        ];
        await pool.query(query, values);
    }
}


async function seed() {
    try {
        console.log('Seeding lookup tables...');

        // Categories
        const categories = ['Pants', 'Tops', 'Skirts', 'Sweaters', 'Dresses', 'Coats and Jackets', 'Shoes', 'Bags and Belts'];
        for (const name of categories) {
            await pool.query(
                'INSERT INTO categories (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
                [name]
            );
        }
        console.log(`Inserted ${categories.length} categories`);

        // Eras
        const eras = ['1920s', '1950s', '1960s', '1970s', '1980s', '1990s', 'Y2K'];
            for (const name of eras) {
                await pool.query(
                    'INSERT INTO eras (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
                    [name]
                );   
            }
            console.log(`Inserted ${eras.length} eras`);

        // Colors
         const colors = ['Black', 'White', 'Brown', 'Beige', 'Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Purple', 'Gray', 'Multi'];
            for (const name of colors) {
                await pool.query(
                    'INSERT INTO colors (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
                    [name]
                );
            }
            console.log(`Inserted ${colors.length} colors`);

        // Conditions
             const conditions = ['Good As New', 'Gently Loved', 'Patched With Love', 'Well-Worn'];
             for (const name of conditions) {
                await pool.query(
                    'INSERT INTO conditions (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
                    [name]
                );
             }
             console.log(`Inserted ${conditions.length} conditions`);

             console.log('Lookup tables added');

             console.log('Building lookup maps...');
             const categoryMap = await buildLookupMap('categories');
             const eraMap = await buildLookupMap('eras');
             const colorMap = await buildLookupMap('colors');
             const conditionMap = await buildLookupMap('conditions');

             console.log('Seeding products...');
             await seedProducts(categoryMap, eraMap, colorMap, conditionMap);

    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        await pool.end();
    }
}

seed();