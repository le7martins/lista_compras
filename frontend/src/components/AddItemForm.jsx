import { useState } from 'react';

export function AddItemForm({ onAdd }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      await onAdd(name.trim(), Number(quantity), unit.trim() || undefined);
      setName('');
      setQuantity(1);
      setUnit('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Item (ex: leite)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        required
      />
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-16 border rounded-lg px-2 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <input
        type="text"
        placeholder="un"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        className="w-16 border rounded-lg px-2 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-4 py-2 text-sm disabled:opacity-50"
      >
        {loading ? '...' : 'Adicionar'}
      </button>
    </form>
  );
}
