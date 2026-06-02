const express = require('express');
const router  = express.Router();
const db      = require('../db');

const EMPRESA_ID = 1;

// GET /api/notas  →  { "1": "texto...", "5": "texto..." }
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT estandar_id, texto FROM notas WHERE empresa_id = ?',
      [EMPRESA_ID]
    );
    const result = {};
    rows.forEach(r => { result[r.estandar_id] = r.texto || ''; });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/notas/:id  →  upsert nota
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { texto } = req.body;

  try {
    await db.query(
      `INSERT INTO notas (empresa_id, estandar_id, texto)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE texto = VALUES(texto)`,
      [EMPRESA_ID, id, texto || '']
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
