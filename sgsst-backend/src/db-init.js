// Crea las tablas y la fila inicial de empresa.
// Ejecutar: node src/db-init.js
require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function init() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  const sql = fs.readFileSync(path.join(__dirname, '..', 'schema.sql'), 'utf8');

  // Ejecutar el schema completo
  await pool.query(sql);
  console.log('✅ Tablas creadas / verificadas');

  // Seed: asegurar que existe la fila de empresa id=1
  const { rows } = await pool.query('SELECT id FROM empresa WHERE id = 1');
  if (rows.length === 0) {
    await pool.query('INSERT INTO empresa DEFAULT VALUES');
    console.log('✅ Empresa inicial creada (id=1)');
  } else {
    console.log('ℹ️  Empresa id=1 ya existe');
  }

  await pool.end();
  console.log('✅ Base de datos inicializada correctamente');
}

init().catch(err => {
  console.error('❌ Error al inicializar BD:', err.message);
  process.exit(1);
});
