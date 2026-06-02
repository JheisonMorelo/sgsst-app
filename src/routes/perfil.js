const express = require('express');
const router  = express.Router();
const db      = require('../db');

const EMPRESA_ID = 1;

// GET /api/perfil
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM empresa WHERE id = ?',
      [EMPRESA_ID]
    );
    if (!rows.length) return res.status(404).json({ error: 'Empresa no encontrada' });

    const e = rows[0];
    res.json({
      nombre:         e.nombre,
      nit:            e.nit,
      trabajadores:   e.trabajadores,
      claseRiesgo:    e.clase_riesgo,
      arl:            e.arl,
      responsableSST: e.responsable_sst,
      configurado:    Boolean(e.configurado),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/perfil
router.put('/', async (req, res) => {
  const { nombre, nit, trabajadores, claseRiesgo, arl, responsableSST, configurado } = req.body;

  if (!trabajadores || !claseRiesgo) {
    return res.status(400).json({ error: 'trabajadores y claseRiesgo son requeridos' });
  }

  try {
    await db.query(
      `UPDATE empresa SET
        nombre         = ?,
        nit            = ?,
        trabajadores   = ?,
        clase_riesgo   = ?,
        arl            = ?,
        responsable_sst = ?,
        configurado    = ?
       WHERE id = ?`,
      [
        nombre        || '',
        nit           || '',
        Number(trabajadores),
        claseRiesgo,
        arl           || '',
        responsableSST || '',
        configurado ? 1 : 0,
        EMPRESA_ID,
      ]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
