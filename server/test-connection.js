require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const pool = require('./db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Anslutning misslyckades:', err);
  } else {
    console.log('Ansluten! Servertid:', res.rows[0].now);
  }
  pool.end();
});