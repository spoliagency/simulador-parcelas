export default function ParcelasConfig({ maxParcelas, onChangeMax, banco, onUpdateTaxas }) {
  const taxas = banco?.taxasPorParcela ?? {}

  function handleTaxa(parcela, valor) {
    const t = parseFloat(valor)
    const novo = { ...taxas }
    if (valor === '' || isNaN(t)) {
      delete novo[parcela]
    } else {
      novo[parcela] = t
    }
    onUpdateTaxas(novo)
  }

  const parcelas = Array.from({ length: maxParcelas }, (_, i) => i + 1)

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">
        Parcelas disponíveis
      </p>

      <div className="flex items-center gap-3">
        <input
          type="number"
          min="1"
          max="60"
          value={maxParcelas}
          onChange={(e) => {
            const n = parseInt(e.target.value)
            if (!isNaN(n) && n >= 1 && n <= 60) onChangeMax(n)
          }}
          className="w-24 bg-surface-2 border border-black/10 rounded-lg px-3 py-2 text-sm text-gray-900 font-mono focus:outline-none focus:border-accent"
        />
        <span className="text-sm text-muted">parcelas máximas</span>
      </div>

      <div className="space-y-1.5">
        {parcelas.map((n) => {
          const taxaEspecifica = taxas[n]
          return (
            <div key={n} className="flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-gray-700 w-8 shrink-0">{n}×</span>
              <input
                type="number"
                placeholder={banco?.taxa ?? '—'}
                value={taxaEspecifica ?? ''}
                onChange={(e) => handleTaxa(n, e.target.value)}
                min="0"
                step="0.01"
                className="w-28 bg-surface-2 border border-black/10 rounded-lg px-3 py-1.5 text-sm text-gray-900 placeholder-muted focus:outline-none focus:border-accent"
              />
              <span className="text-xs text-muted">% a.m.</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
