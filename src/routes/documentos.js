const express = require('express');
const router  = express.Router();
const db      = require('../db');

const EMPRESA_ID = 1;

// GET /api/documentos  →  { d1: { fecha, responsable }, ... }
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT documento_id, fecha, responsable FROM documentos WHERE empresa_id = ?',
      [EMPRESA_ID]
    );
    const result = {};
    rows.forEach(r => {
      result[r.documento_id] = {
        fecha:       r.fecha ? r.fecha.toISOString().split('T')[0] : '',
        responsable: r.responsable || '',
      };
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/documentos/:id  →  upsert fecha y/o responsable
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { fecha, responsable } = req.body;

  try {
    await db.query(
      `INSERT INTO documentos (empresa_id, documento_id, fecha, responsable)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         fecha       = COALESCE(VALUES(fecha), fecha),
         responsable = COALESCE(VALUES(responsable), responsable)`,
      [
        EMPRESA_ID,
        id,
        fecha || null,
        responsable || '',
      ]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
