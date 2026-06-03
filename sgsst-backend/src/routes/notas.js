const express = require('express');
const router  = express.Router();
const db      = require('../db');

const EMPRESA_ID = 1;

// GET /api/notas
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT estandar_id, texto FROM notas WHERE empresa_id = $1',
      [EMPRESA_ID]
    );
    const result = {};
    rows.forEach(r => { result[r.estandar_id] = r.texto || ''; });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/notas/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { texto } = req.body;

  try {
    await db.query(
      `INSERT INTO notas (empresa_id, estandar_id, texto)
       VALUES ($1, $2, $3)
       ON CONFLICT (empresa_id, estandar_id) DO UPDATE SET
         texto      = EXCLUDED.texto,
         updated_at = CURRENT_TIMESTAMP`,
      [EMPRESA_ID, id, texto || '']
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
