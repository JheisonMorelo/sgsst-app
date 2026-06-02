const express = require('express');
const router  = express.Router();
const db      = require('../db');

const EMPRESA_ID = 1;

// GET /api/completados  →  ["1","3","7",...]
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT estandar_id FROM estandares_completados WHERE empresa_id = ?',
      [EMPRESA_ID]
    );
    res.json(rows.map(r => r.estandar_id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/completados/:id  →  marcar completado
router.post('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      'INSERT IGNORE INTO estandares_completados (empresa_id, estandar_id) VALUES (?, ?)',
      [EMPRESA_ID, id]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/completados/:id  →  desmarcar
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      'DELETE FROM estandares_completados WHERE empresa_id = ? AND estandar_id = ?',
      [EMPRESA_ID, id]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
