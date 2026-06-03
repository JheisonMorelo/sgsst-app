require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const perfilRouter      = require('./routes/perfil');
const completadosRouter = require('./routes/completados');
const documentosRouter  = require('./routes/documentos');
const notasRouter       = require('./routes/notas');
const calendarioRouter  = require('./routes/calendario');

const app  = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = (process.env.FRONTEND_ORIGIN || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean)
  .concat(['http://localhost:5173', 'http://localhost:5174']);

app.use(cors({
  origin: (origin, cb) => {
    // Permitir requests sin origin (Postman, curl) y orígenes en la lista
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

app.listen(PORT, () => {
  console.log(`🚀 SG-SST Backend corriendo en http://localhost:${PORT}`);
});
