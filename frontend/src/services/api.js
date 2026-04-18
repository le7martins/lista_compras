import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const LIST_ID = import.meta.env.VITE_LIST_ID;

const client = axios.create({ baseURL: BASE_URL });

export const api = {
  getItems: () =>
    client.get(`/lists/${LIST_ID}/items`).then((r) => r.data),

  addItem: (name, quantity = 1, unit) =>
    client
      .post(`/lists/${LIST_ID}/items`, { name, quantity, unit, added_via: 'app' })
      .then((r) => r.data),

  checkItem: (itemId, checked) =>
    client
      .patch(`/lists/${LIST_ID}/items/${itemId}`, { checked })
      .then((r) => r.data),

  deleteItem: (itemId) =>
    client.delete(`/lists/${LIST_ID}/items/${itemId}`).then((r) => r.data),
};
