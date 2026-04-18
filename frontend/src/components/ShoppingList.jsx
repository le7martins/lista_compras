import { ItemCard } from './ItemCard';

export function ShoppingList({ items, onToggle, onRemove }) {
  const pending = items.filter((i) => !i.checked);
  const done = items.filter((i) => i.checked);

  if (!items.length) {
    return (
      <p className="text-center text-gray-400 py-10 text-sm">
        Lista vazia. Adicione um item acima ou peça para a Alexa!
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {pending.map((item) => (
        <ItemCard key={item.id} item={item} onToggle={onToggle} onRemove={onRemove} />
      ))}
      {done.length > 0 && (
        <>
          <p className="text-xs text-gray-400 pt-3 pb-1">Já comprados ({done.length})</p>
          {done.map((item) => (
            <ItemCard key={item.id} item={item} onToggle={onToggle} onRemove={onRemove} />
          ))}
        </>
      )}
    </div>
  );
}
