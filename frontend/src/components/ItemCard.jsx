export function ItemCard({ item, onToggle, onRemove }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${item.checked ? 'bg-gray-50 opacity-60' : 'bg-white'}`}>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggle(item.id, !item.checked)}
        className="w-5 h-5 accent-green-500 cursor-pointer"
      />
      <div className="flex-1 min-w-0">
        <span className={`text-sm font-medium ${item.checked ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {item.name}
        </span>
        {(item.quantity > 1 || item.unit) && (
          <span className="ml-2 text-xs text-gray-400">
            {item.quantity}{item.unit ? ` ${item.unit}` : ''}
          </span>
        )}
      </div>
      {item.added_via === 'alexa' && (
        <span className="text-xs bg-blue-100 text-blue-600 rounded px-1.5 py-0.5">Alexa</span>
      )}
      <button
        onClick={() => onRemove(item.id)}
        className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
        aria-label="Remover item"
      >
        ×
      </button>
    </div>
  );
}
