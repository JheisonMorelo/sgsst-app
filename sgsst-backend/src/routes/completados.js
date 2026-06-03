const express = require('express');
const router  = express.Router();
const db      = require('../db');

const EMPRESA_ID = 1;

// GET /api/completados
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT estandar_id FROM estandares_completados WHERE empresa_id = $1',
      [EMPRESA_ID]
    );
    res.json(rows.map(r => r.estandar_id));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/completados/:id
router.post('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      `INSERT INTO estandares_completados (empresa_id, estandar_id)
       VALUES ($1, $2)
       ON CONFLICT (empresa_id, estandar_id) DO NOTHING`,
      [EMPRESA_ID, id]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/completados/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      'DELETE FROM estandares_completados WHERE empresa_id = $1 AND estandar_id = $2',
      [EMPRESA_ID, id]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
