import { PARCELAS_POPULARES } from '../data/defaults.js'

export default function ParcelasSelector({ opcoes, parcelas, onChange }) {
  const sorted = [...opcoes].sort((a, b) => a - b)

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold uppercase tracking-widest text-muted">
        Parcelas
      </label>

      <div className="flex flex-wrap gap-2">
        {sorted.map((n) => {
          const selecionado = parcelas === n
          const popular = PARCELAS_POPULARES.includes(n)
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={`relative px-4 py-2 rounded-full text-sm font-mono font-semibold border transition-colors ${
                selecionado
                  ? 'bg-accent border-accent text-white'
                  : 'bg-surface border-black/10 text-gray-700 hover:border-accent/50'
              }`}
            >
              {n}×
              {popular && !selecionado && (
                <span className="absolute -top-1.5 -right-1 text-[8px] font-bold uppercase bg-accent text-white px-1 rounded-full leading-tight">
                  pop
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
