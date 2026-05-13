import { formatBRL } from '../lib/formatters.js'

export default function ClienteProdutos({ categorias, selectedItem, onSelect }) {
  const categoriaAtiva = categorias.find((c) =>
    c.items.some((i) => i.id === selectedItem?.id)
  ) ?? categorias[0]

  function handleCategoriaClick(cat) {
    if (cat.items.length > 0 && (!selectedItem || !cat.items.find((i) => i.id === selectedItem.id))) {
      onSelect(cat.items[0])
    }
  }

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold uppercase tracking-widest text-muted">
        Produto
      </label>

      {/* Tabs de categoria */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categorias.map((cat) => {
          const ativa = categoriaAtiva?.id === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoriaClick(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap transition-colors flex-shrink-0 ${
                ativa
                  ? 'bg-accent border-accent text-white'
                  : 'bg-surface border-black/10 text-gray-600 hover:border-accent/50'
              }`}
            >
              {cat.nome}
            </button>
          )
        })}
      </div>

      {/* Lista de itens da categoria ativa */}
      {categoriaAtiva && (
        <div className="bg-surface rounded-xl border border-black/8 overflow-hidden">
          {categoriaAtiva.items.map((item, idx) => {
            const selecionado = selectedItem?.id === item.id
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                  idx > 0 ? 'border-t border-black/5' : ''
                } ${
                  selecionado
                    ? 'bg-accent/8'
                    : 'hover:bg-surface-2'
                }`}
              >
                <span className={`text-sm font-medium ${selecionado ? 'text-accent' : 'text-gray-800'}`}>
                  {item.nome}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-mono ${selecionado ? 'text-accent font-semibold' : 'text-muted'}`}>
                    {formatBRL(item.valor)}
                  </span>
                  {selecionado && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
