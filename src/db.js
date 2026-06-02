require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'sgsst_db',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
  timezone: 'Z',
});

// Verificar conexión al arrancar
pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL conectado —', process.env.DB_NAME || 'sgsst_db');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error MySQL:', err.message);
    process.exit(1);
  });

module.exports = pool;
