require('dotenv').config();
const { Pool } = require('pg');

const dbUrl = process.env.DATABASE_URL || '';

// URL interna de Render (dpg-xxx/dbname) no usa SSL
// URL externa (dpg-xxx.oregon-postgres.render.com) sí necesita SSL
const needsSsl = dbUrl.includes('.render.com') || dbUrl.includes('render.com');

const pool = new Pool({
  connectionString: dbUrl,
  ssl: needsSsl ? { rejectUnauthorized: false } : false,
  max: 5,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
  keepAlive: true,
});

pool.on('error', (err) => {
  console.error('Pool error:', err.message);
});

pool.connect()
  .then(client => {
    console.log('✅ PostgreSQL conectado (SSL:', needsSsl, ')');
    client.release();
  })
  .catch(err => {
    console.error('⚠️  PostgreSQL no disponible al arrancar:', err.message);
  });

module.exports = pool;
