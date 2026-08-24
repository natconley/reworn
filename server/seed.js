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

        //categories
        //eras
        //colors
        //conditions

    }
}