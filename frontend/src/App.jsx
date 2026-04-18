import { useShoppingList } from './hooks/useShoppingList';
import { AddItemForm } from './components/AddItemForm';
import { ShoppingList } from './components/ShoppingList';

export default function App() {
  const { items, loading, error, addItem, toggleCheck, removeItem } = useShoppingList();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-500 text-white px-4 py-4 shadow">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <h1 className="text-xl font-bold">Lista de Compras</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <AddItemForm onAdd={addItem} />

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {loading ? (
          <p className="text-center text-gray-400 text-sm">Carregando...</p>
        ) : (
          <ShoppingList items={items} onToggle={toggleCheck} onRemove={removeItem} />
        )}

        <p className="text-center text-xs text-gray-300 mt-8">
          Diga à Alexa: <em>"Alexa, adiciona leite à lista de compras"</em>
        </p>
      </main>
    </div>
  );
}
