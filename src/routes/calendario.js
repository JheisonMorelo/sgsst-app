const express = require('express');
const router  = express.Router();
const db      = require('../db');

const EMPRESA_ID = 1;

// GET /api/calendario  →  { "1-31-Autoevaluación...": true, ... }
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT obligacion_key FROM calendario_completadas WHERE empresa_id = ?',
      [EMPRESA_ID]
    );
    const result = {};
    rows.forEach(r => { result[r.obligacion_key] = true; });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/calendario  →  marcar obligación completada
// body: { key: "1-31-Titulo" }
router.post('/', async (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ error: 'key requerido' });

  try {
    await db.query(
      'INSERT IGNORE INTO calendario_completadas (empresa_id, obligacion_key) VALUES (?, ?)',
      [EMPRESA_ID, key]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/calendario  →  desmarcar obligación
// body: { key: "1-31-Titulo" }
router.delete('/', async (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ error: 'key requerido' });

  try {
    await db.query(
      'DELETE FROM calendario_completadas WHERE empresa_id = ? AND obligacion_key = ?',
      [EMPRESA_ID, key]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
