import { useState } from 'react'

export default function TaxasConfig({ banco, onUpdate }) {
  const [novaParcela, setNovaParcela] = useState('')
  const [novaTaxa, setNovaTaxa] = useState('')

  const taxas = banco?.taxasPorParcela ?? {}
  const entradas = Object.entries(taxas)
    .map(([k, v]) => ({ parcela: Number(k), taxa: v }))
    .sort((a, b) => a.parcela - b.parcela)

  function handleAdd() {
    const p = parseInt(novaParcela)
    const t = parseFloat(novaTaxa)
    if (isNaN(p) || p < 1 || p > 60) return
    if (isNaN(t) || t < 0) return
    onUpdate({ ...taxas, [p]: t })
    setNovaParcela('')
    setNovaTaxa('')
  }

  function handleRemove(parcela) {
    const novo = { ...taxas }
    delete novo[parcela]
    onUpdate(novo)
  }

  if (!banco) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          Taxas por parcela
        </p>
        <p className="text-xs text-muted">
          Padrão: <span className="font-mono text-gray-700">{banco.taxa}%</span>
        </p>
      </div>

      {entradas.length > 0 && (
        <div className="space-y-1.5">
          {entradas.map(({ parcela, taxa }) => (
            <div key={parcela} className="flex items-center gap-2 px-3 py-2 bg-surface-2 rounded-lg">
              <span className="font-mono text-sm font-semibold text-gray-800 w-8">{parcela}×</span>
              <span className="flex-1 text-sm text-gray-700">{taxa}% a.m.</span>
              <button
                onClick={() => handleRemove(parcela)}
                className="opacity-40 hover:opacity-100 text-sm leading-none transition-opacity"
                aria-label={`Remover taxa ${parcela}x`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {entradas.length === 0 && (
        <p className="text-xs text-muted italic">
          Nenhuma taxa específica — usando {banco.taxa}% para todas as parcelas.
        </p>
      )}

      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Parcelas"
          value={novaParcela}
          onChange={(e) => setNovaParcela(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          min="1"
          max="60"
          className="w-24 bg-surface-2 border border-black/10 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-muted focus:outline-none focus:border-accent"
        />
        <input
          type="number"
          placeholder="Taxa %"
          value={novaTaxa}
          onChange={(e) => setNovaTaxa(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
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
    </div>
  )
}
