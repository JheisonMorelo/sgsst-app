// Crea la base de datos y las tablas si no existen.
// Ejecutar: node src/db-init.js
require('dotenv').config();
const mysql = require('mysql2/promise');
const fs    = require('fs');
const path  = require('path');

async function init() {
  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST     || 'localhost',
    port:     Number(process.env.DB_PORT) || 3306,
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  const raw = fs.readFileSync(path.join(__dirname, '..', 'schema.sql'), 'utf8');

  // Eliminar líneas de comentario antes de dividir por ';'
  const sql = raw
    .split('\n')
    .filter(line => !line.trim().startsWith('--'))
    .join('\n');

  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const stmt of statements) {
    await conn.query(stmt);
  }

  console.log('✅ Base de datos sgsst_db inicializada correctamente.');
  await conn.end();
}

init().catch(err => {
  console.error('❌ Error al inicializar BD:', err.message);
  process.exit(1);
});
