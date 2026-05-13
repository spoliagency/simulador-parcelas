import { PARCELAS_POPULARES } from '../data/defaults.js'

export default function ParcelasSlider({ parcelas, onChange, max = 18 }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-widest text-muted">
          Parcelas
        </label>
        <div className="flex items-center gap-2">
          <span className="font-mono text-2xl font-bold text-gray-900">{parcelas}×</span>
          {PARCELAS_POPULARES.includes(parcelas) && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-accent px-2 py-0.5 rounded-full text-white">
              mais escolhido
            </span>
          )}
        </div>
      </div>

      <input
        type="range"
        min={1}
        max={max}
        value={parcelas}
        onChange={(e) => onChange(Number(e.target.value))}
      />

      <div className="flex justify-between text-xs text-muted">
        <span>1×</span>
        <span>{Math.round(max / 3)}×</span>
        <span>{Math.round((max * 2) / 3)}×</span>
        <span>{max}×</span>
      </div>
    </div>
  )
}
