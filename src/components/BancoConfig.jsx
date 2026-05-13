import { useState } from 'react'

export default function BancoConfig({ bancos, selectedBanco, onSelect, onAdd, onRemove, readOnly = false }) {
  const [novoNome, setNovoNome] = useState('')
  const [novaTaxa, setNovaTaxa] = useState('')

  function handleAdd() {
    const nome = novoNome.trim()
    const taxa = parseFloat(novaTaxa)
    if (!nome || isNaN(taxa) || taxa < 0) return
    if (bancos.length >= 8) return
    onAdd({ id: Date.now().toString(), nome, taxa })
    setNovoNome('')
    setNovaTaxa('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold uppercase tracking-widest text-muted">
        Banco / Financeira
      </label>

      <div className="flex flex-wrap gap-2">
        {bancos.map((banco) => (
          <div
            key={banco.id}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border cursor-pointer transition-colors ${
              selectedBanco?.id === banco.id
                ? 'bg-accent border-accent text-white'
                : 'bg-surface-2 border-black/10 text-gray-800 hover:border-accent/50'
            }`}
            onClick={() => onSelect(banco)}
          >
            <span>{banco.nome}</span>
            <span className="text-xs opacity-70">{banco.taxa}%</span>
            {!readOnly && (
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(banco.id) }}
                className="ml-0.5 opacity-50 hover:opacity-100 text-xs leading-none"
                aria-label={`Remover ${banco.nome}`}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {!readOnly && bancos.length < 8 && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nome do banco"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-surface-2 border border-black/10 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-muted focus:outline-none focus:border-accent"
          />
          <input
            type="number"
            placeholder="Taxa %"
            value={novaTaxa}
            onChange={(e) => setNovaTaxa(e.target.value)}
            onKeyDown={handleKeyDown}
            min="0"
            step="0.01"
            className="w-24 bg-surface-2 border border-black/10 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-muted focus:outline-none focus:border-accent"
          />
          <button
            onClick={handleAdd}
            className="px-3 py-2 bg-surface-2 border border-black/10 rounded-lg text-sm text-accent hover:border-accent transition-colors whitespace-nowrap"
          >
            + Salvar
          </button>
        </div>
      )}
    </div>
  )
}
