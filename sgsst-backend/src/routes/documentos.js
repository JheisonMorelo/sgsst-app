const express = require('express');
const router  = express.Router();
const db      = require('../db');

const EMPRESA_ID = 1;

// GET /api/documentos
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT documento_id, fecha, responsable FROM documentos WHERE empresa_id = $1',
      [EMPRESA_ID]
    );
    const result = {};
    rows.forEach(r => {
      result[r.documento_id] = {
        // pg devuelve Date object — formatear a YYYY-MM-DD
        fecha:       r.fecha ? new Date(r.fecha).toISOString().split('T')[0] : '',
        responsable: r.responsable || '',
      };
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/documentos/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { fecha, responsable } = req.body;

  try {
    await db.query(
      `INSERT INTO documentos (empresa_id, documento_id, fecha, responsable)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (empresa_id, documento_id) DO UPDATE SET
         fecha       = COALESCE(EXCLUDED.fecha,       documentos.fecha),
         responsable = COALESCE(EXCLUDED.responsable, documentos.responsable),
         updated_at  = CURRENT_TIMESTAMP`,
      [EMPRESA_ID, id, fecha || null, responsable || '']
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
