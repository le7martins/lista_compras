const { Router } = require('express');
const pool = require('../db/connection');

const router = Router();

router.post('/', async (req, res) => {
  const { name = 'Lista de Compras' } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO lists (name) VALUES ($1) RETURNING *',
    [name]
  );
  res.status(201).json(rows[0]);
});

router.get('/', async (_req, res) => {
  const { rows } = await pool.query('SELECT * FROM lists ORDER BY created_at DESC');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM lists WHERE id = $1', [req.params.id]);
  if (!rows.length) return res.status(404).json({ error: 'List not found' });
  res.json(rows[0]);
});

router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM lists WHERE id = $1', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
