require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
     // Supabase kräver krypterad anslutning, struntar i verifiering pga projektets omfattning
    ssl: { rejectUnauthorized: false}
});

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

async function buildLookupMap(tableName) {
        const result = await pool.query(`SELECT * FROM ${tableName}`);
        const map = {};
        for (const row of result.rows) {
            map[row.name] = row.id;
        }
        return map;
}

async function seedProducts(categoryMap, eraMap, colorMap, conditionMap) {

}
