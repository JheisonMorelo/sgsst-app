require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false,
  max: 5,
  idleTimeoutMillis: 10000,      // cerrar conexiones idle a los 10s (Render free cierra ~30s)
  connectionTimeoutMillis: 10000,
  keepAlive: true,
  keepAliveInitialDelayMillis: 5000,
});

pool.on('error', (err) => {
  console.error('Pool error (reconectará en próxima query):', err.message);
});

pool.connect()
  .then(client => {
    console.log('✅ PostgreSQL conectado');
    client.release();
  })
  .catch(err => {
    console.error('⚠️  PostgreSQL no disponible al arrancar:', err.message);
  });

module.exports = pool;
