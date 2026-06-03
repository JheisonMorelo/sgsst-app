require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // SSL requerido en Render y la mayoría de proveedores cloud
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
});

pool.connect()
  .then(client => {
    console.log('✅ PostgreSQL conectado');
    client.release();
  })
  .catch(err => {
    console.error('❌ Error PostgreSQL:', err.message);
    process.exit(1);
  });

module.exports = pool;
