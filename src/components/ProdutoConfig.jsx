import { useState } from 'react'
import { formatBRL } from '../lib/formatters.js'

export default function ProdutoConfig({ categorias, onAddCategoria, onRemoveCategoria, onAddItem, onRemoveItem }) {
  const [novaCategoria, setNovaCategoria] = useState('')
  const [novoItem, setNovoItem] = useState({}) // { [catId]: { nome, valor } }

  function handleNovoItemChange(catId, field, value) {
    setNovoItem((prev) => ({
      ...prev,
      [catId]: { ...(prev[catId] || { nome: '', valor: '' }), [field]: value },
    }))
  }

  function handleAddItem(catId) {
    const { nome = '', valor = '' } = novoItem[catId] || {}
    const v = parseFloat(valor)
    if (!nome.trim() || isNaN(v) || v <= 0) return
    onAddItem(catId, { id: Date.now().toString(), nome: nome.trim(), valor: v })
    setNovoItem((prev) => ({ ...prev, [catId]: { nome: '', valor: '' } }))
  }

  function handleKeyDown(e, fn) {
    if (e.key === 'Enter') fn()
  }

  function handleAddCategoria() {
    const nome = novaCategoria.trim()
    if (!nome) return
    onAddCategoria({ id: Date.now().toString(), nome, items: [] })
    setNovaCategoria('')
  }

  return (
    <div className="space-y-4">
      <label className="text-xs font-semibold uppercase tracking-widest text-muted">
        Produtos
      </label>

      {categorias.map((cat) => (
        <div key={cat.id} className="border border-black/8 rounded-xl overflow-hidden">
          {/* Cabeçalho da categoria */}
          <div className="flex items-center justify-between px-3 py-2 bg-surface-2">
            <span className="text-sm font-semibold text-gray-800">{cat.nome}</span>
            <button
              onClick={() => onRemoveCategoria(cat.id)}
              className="text-xs text-muted hover:text-red-500 transition-colors px-1"
              aria-label={`Remover categoria ${cat.nome}`}
            >
              Remover
            </button>
          </div>

          {/* Itens */}
          <div className="divide-y divide-black/5">
            {cat.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-gray-800">{item.nome}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-muted">{formatBRL(item.valor)}</span>
                  <button
                    onClick={() => onRemoveItem(cat.id, item.id)}
                    className="opacity-40 hover:opacity-100 text-xs text-red-500 transition-opacity"
                    aria-label={`Remover ${item.nome}`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Form add item */}
          <div className="flex gap-2 p-2 bg-surface border-t border-black/5">
            <input
              type="text"
              placeholder="Versão (ex: iPhone 17 Pro)"
              value={novoItem[cat.id]?.nome || ''}
              onChange={(e) => handleNovoItemChange(cat.id, 'nome', e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, () => handleAddItem(cat.id))}
              className="flex-1 bg-surface-2 border border-black/10 rounded-lg px-2 py-1.5 text-xs text-gray-900 placeholder-muted focus:outline-none focus:border-accent"
            />
            <input
              type="number"
              placeholder="R$"
              value={novoItem[cat.id]?.valor || ''}
              onChange={(e) => handleNovoItemChange(cat.id, 'valor', e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, () => handleAddItem(cat.id))}
              min="0"
              step="0.01"
              className="w-24 bg-surface-2 border border-black/10 rounded-lg px-2 py-1.5 text-xs text-gray-900 placeholder-muted focus:outline-none focus:border-accent"
            />
            <button
              onClick={() => handleAddItem(cat.id)}
              className="px-2 py-1.5 bg-surface-2 border border-black/10 rounded-lg text-xs text-accent hover:border-accent transition-colors whitespace-nowrap"
            >
              + Add
            </button>
          </div>
        </div>
      ))}

      {/* Add categoria */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Nova categoria (ex: iPads)"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, handleAddCategoria)}
          className="flex-1 bg-surface-2 border border-black/10 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-muted focus:outline-none focus:border-accent"
        />
        <button
          onClick={handleAddCategoria}
          className="px-3 py-2 bg-surface-2 border border-black/10 rounded-lg text-sm text-accent hover:border-accent transition-colors whitespace-nowrap"
        >
          + Categoria
        </button>
      </div>
    </div>
  )
}
