require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');
const pool    = require('./db');

const perfilRouter      = require('./routes/perfil');
const completadosRouter = require('./routes/completados');
const documentosRouter  = require('./routes/documentos');
const notasRouter       = require('./routes/notas');
const calendarioRouter  = require('./routes/calendario');

const app  = express();
const PORT = process.env.PORT || 3001;

// ─── Auto-init BD al arrancar ─────────────────────────────────────────────────
async function initDB() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, '..', 'schema.sql'), 'utf8');
    await pool.query(sql);

    const { rows } = await pool.query('SELECT id FROM empresa WHERE id = 1');
    if (rows.length === 0) {
      await pool.query('INSERT INTO empresa DEFAULT VALUES');
      console.log('✅ BD inicializada y empresa creada');
    } else {
      console.log('✅ BD lista (empresa id=1 existe)');
    }
  } catch (err) {
    console.error('⚠️  Error inicializando BD:', err.message);
  }
}

// ─── Middleware ───────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = (process.env.FRONTEND_ORIGIN || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean)
  .concat(['http://localhost:5173', 'http://localhost:5174']);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error(`CORS bloqueado: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Rutas ────────────────────────────────────────────────────────────────────
app.use('/api/perfil',      perfilRouter);
app.use('/api/completados', completadosRouter);
app.use('/api/documentos',  documentosRouter);
app.use('/api/notas',       notasRouter);
app.use('/api/calendario',  calendarioRouter);

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.path}` });
});

// ─── Error global ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// ─── Arrancar servidor + inicializar BD ──────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`🚀 SG-SST Backend corriendo en http://localhost:${PORT}`);
  await initDB();
});
