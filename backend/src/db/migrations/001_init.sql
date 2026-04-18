CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS lists (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       VARCHAR(255) NOT NULL DEFAULT 'Lista de Compras',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id    UUID NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
  name       VARCHAR(255) NOT NULL,
  quantity   INTEGER NOT NULL DEFAULT 1,
  unit       VARCHAR(50),
  checked    BOOLEAN NOT NULL DEFAULT FALSE,
  added_via  VARCHAR(10) NOT NULL DEFAULT 'app',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
