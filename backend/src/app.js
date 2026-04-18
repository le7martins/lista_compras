require('dotenv').config();
const express = require('express');
const corsMiddleware = require('./middleware/cors');
const listsRouter = require('./handlers/lists');
const itemsRouter = require('./handlers/items');

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/lists', listsRouter);
app.use('/lists/:id/items', itemsRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
