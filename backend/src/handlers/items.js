const { Router } = require('express');
const pool = require('../db/connection');

const router = Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM items WHERE list_id = $1 ORDER BY created_at ASC',
    [req.params.id]
  );
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { name, quantity = 1, unit, added_via = 'app' } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });

  const { rows } = await pool.query(
    `INSERT INTO items (list_id, name, quantity, unit, added_via)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [req.params.id, name, quantity, unit || null, added_via]
  );
  res.status(201).json(rows[0]);
});

router.patch('/:itemId', async (req, res) => {
  const { name, quantity, unit, checked } = req.body;
  const { rows } = await pool.query(
    `UPDATE items SET
       name      = COALESCE($1, name),
       quantity  = COALESCE($2, quantity),
       unit      = COALESCE($3, unit),
       checked   = COALESCE($4, checked)
     WHERE id = $5 AND list_id = $6
     RETURNING *`,
    [name, quantity, unit, checked, req.params.itemId, req.params.id]
  );
  if (!rows.length) return res.status(404).json({ error: 'Item not found' });
  res.json(rows[0]);
});

router.delete('/:itemId', async (req, res) => {
  await pool.query(
    'DELETE FROM items WHERE id = $1 AND list_id = $2',
    [req.params.itemId, req.params.id]
  );
  res.status(204).end();
});

module.exports = router;
