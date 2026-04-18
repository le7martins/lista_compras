const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

const BASE_URL = process.env.BACKEND_API_URL;
const LIST_ID = process.env.LIST_ID;

async function request(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'API error');
  return data;
}

const listPath = (suffix = '') => `/lists/${LIST_ID}/items${suffix}`;

module.exports = {
  getItems: () => request('GET', listPath()),
  addItem: (name, quantity, unit) =>
    request('POST', listPath(), { name, quantity, unit, added_via: 'alexa' }),
  removeItemByName: async (name) => {
    const items = await module.exports.getItems();
    const item = items.find(
      (i) => i.name.toLowerCase() === name.toLowerCase()
    );
    if (!item) return null;
    await request('DELETE', listPath(`/${item.id}`));
    return item;
  },
  checkItemByName: async (name) => {
    const items = await module.exports.getItems();
    const item = items.find(
      (i) => i.name.toLowerCase() === name.toLowerCase()
    );
    if (!item) return null;
    return request('PATCH', listPath(`/${item.id}`), { checked: true });
  },
};
