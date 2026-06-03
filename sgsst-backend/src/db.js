require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
  connectionTimeoutMillis: 5000,
});

// Verificar conexión al arrancar — solo loggear, nunca matar el proceso
pool.connect()
  .then(client => {
    console.log('✅ PostgreSQL conectado');
    client.release();
  })
  .catch(err => {
    console.error('⚠️  PostgreSQL no disponible al arrancar:', err.message);
    // No process.exit — Render health check debe poder responder
  });

module.exports = pool;
