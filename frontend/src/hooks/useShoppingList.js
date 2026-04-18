import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useShoppingList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      const data = await api.getItems();
      setItems(data);
    } catch (err) {
      setError('Erro ao carregar itens.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
    const interval = setInterval(fetchItems, 10000);
    return () => clearInterval(interval);
  }, [fetchItems]);

  const addItem = useCallback(async (name, quantity, unit) => {
    const item = await api.addItem(name, quantity, unit);
    setItems((prev) => [...prev, item]);
  }, []);

  const toggleCheck = useCallback(async (itemId, checked) => {
    const updated = await api.checkItem(itemId, checked);
    setItems((prev) => prev.map((i) => (i.id === itemId ? updated : i)));
  }, []);

  const removeItem = useCallback(async (itemId) => {
    await api.deleteItem(itemId);
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  return { items, loading, error, addItem, toggleCheck, removeItem, refresh: fetchItems };
}
