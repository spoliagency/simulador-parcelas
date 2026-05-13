import { useState } from 'react'

const FORM_VAZIO = { nome: '', prazo: '', taxaBase: '', maxParcelas: 12 }

export default function GatewayConfig({ gateways, selectedGateway, onSelect, onAdd, onUpdate, onRemove }) {
  const [criando, setCriando] = useState(false)
  const [form, setForm] = useState(FORM_VAZIO)

  function handleSalvarNovo() {
    const nome = form.nome.trim()
    const prazo = form.prazo.trim()
    const taxaBase = parseFloat(form.taxaBase)
    const maxParcelas = parseInt(form.maxParcelas)
    if (!nome || isNaN(taxaBase) || taxaBase < 0) return
    const acrescimos = {}
    for (let i = 1; i <= maxParcelas; i++) acrescimos[i] = 0
    onAdd({ id: Date.now().toString(), nome, prazo, taxaBase, maxParcelas, acrescimos })
    setForm(FORM_VAZIO)
    setCriando(false)
  }

  function handleAcrescimo(parcela, valor) {
    if (!selectedGateway) return
    const t = parseFloat(valor)
    const novos = { ...selectedGateway.acrescimos }
    if (valor === '' || isNaN(t)) {
      novos[parcela] = 0
    } else {
      novos[parcela] = t
    }
    onUpdate({ ...selectedGateway, acrescimos: novos })
  }

  function handleMaxParcelas(n) {
    if (!selectedGateway) return
    const atual = selectedGateway.acrescimos ?? {}
    const novos = {}
    for (let i = 1; i <= n; i++) novos[i] = atual[i] ?? 0
    onUpdate({ ...selectedGateway, maxParcelas: n, acrescimos: novos })
  }

  function handleCampo(campo, valor) {
    if (!selectedGateway) return
    onUpdate({ ...selectedGateway, [campo]: campo === 'taxaBase' ? parseFloat(valor) || 0 : valor })
  }

  const parcelas = selectedGateway
    ? Array.from({ length: selectedGateway.maxParcelas }, (_, i) => i + 1)
    : []

  return (
    <div className="space-y-4">
      {/* Seletor de gateways */}
      <div className="flex flex-wrap gap-2">
        {gateways.map((g) => (
          <button
            key={g.id}
            onClick={() => onSelect(g)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              selectedGateway?.id === g.id
                ? 'bg-accent border-accent text-white'
                : 'bg-surface-2 border-black/10 text-gray-800 hover:border-accent/50'
            }`}
          >
            <span>{g.nome}</span>
            {g.prazo && <span className="ml-1 text-xs opacity-70">· {g.prazo}</span>}
          </button>
        ))}
        <button
          onClick={() => setCriando(true)}
          className="px-3 py-1.5 rounded-full text-sm border border-dashed border-black/20 text-muted hover:border-accent hover:text-accent transition-colors"
        >
          + Novo
        </button>
      </div>

      {/* Formulário novo gateway */}
      {criando && (
        <div className="space-y-2 p-3 bg-surface-2 rounded-xl border border-black/10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">Novo gateway</p>
          <input
            type="text" placeholder="Nome (ex: PagSeguro)"
            value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="w-full bg-surface border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
          />
          <input
            type="text" placeholder="Prazo (ex: 2 dias úteis)"
            value={form.prazo} onChange={(e) => setForm({ ...form, prazo: e.target.value })}
            className="w-full bg-surface border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number" placeholder="Taxa base %" min="0" step="0.01"
                value={form.taxaBase} onChange={(e) => setForm({ ...form, taxaBase: e.target.value })}
                className="w-full bg-surface border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div className="flex-1">
              <input
                type="number" placeholder="Máx parcelas" min="1" max="60"
                value={form.maxParcelas} onChange={(e) => setForm({ ...form, maxParcelas: e.target.value })}
                className="w-full bg-surface border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSalvarNovo}
              className="flex-1 py-2 bg-accent text-white rounded-lg text-sm font-medium"
            >
              Salvar
            </button>
            <button
              onClick={() => { setCriando(false); setForm(FORM_VAZIO) }}
              className="flex-1 py-2 bg-surface-2 border border-black/10 rounded-lg text-sm text-muted"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Edição do gateway selecionado */}
      {selectedGateway && !criando && (
        <div className="space-y-4">
          {/* Campos gerais */}
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <label className="text-xs text-muted mb-1 block">Nome</label>
              <input
                type="text"
                value={selectedGateway.nome}
                onChange={(e) => handleCampo('nome', e.target.value)}
                className="w-full bg-surface-2 border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-muted mb-1 block">Prazo de recebimento</label>
              <input
                type="text"
                value={selectedGateway.prazo}
                onChange={(e) => handleCampo('prazo', e.target.value)}
                className="w-full bg-surface-2 border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">Taxa base %</label>
              <input
                type="number" min="0" step="0.01"
                value={selectedGateway.taxaBase}
                onChange={(e) => handleCampo('taxaBase', e.target.value)}
                className="w-full bg-surface-2 border border-black/10 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">Máx. parcelas</label>
              <input
                type="number" min="1" max="60"
                value={selectedGateway.maxParcelas}
                onChange={(e) => handleMaxParcelas(parseInt(e.target.value) || 1)}
                className="w-full bg-surface-2 border border-black/10 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Tabela de acréscimos */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Acréscimo por parcela
            </p>
            <div className="space-y-1.5">
              {parcelas.map((n) => (
                <div key={n} className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-gray-700 w-8 shrink-0">{n}×</span>
                  <input
                    key={`${selectedGateway.id}-${n}`}
                    type="number"
                    defaultValue={selectedGateway.acrescimos?.[n] ?? 0}
                    onBlur={(e) => handleAcrescimo(n, e.target.value)}
                    min="0"
                    step="0.01"
                    disabled={n === 1}
                    className={`w-28 bg-surface-2 border border-black/10 rounded-lg px-3 py-1.5 text-sm font-mono focus:outline-none focus:border-accent ${
                      n === 1 ? 'opacity-40 cursor-not-allowed' : ''
                    }`}
                  />
                  <span className="text-xs text-muted">%</span>
                  {n === 1 && <span className="text-xs text-muted italic">à vista — sem acréscimo</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Deletar */}
          <button
            onClick={() => onRemove(selectedGateway.id)}
            className="text-xs text-red-400 hover:text-red-600 transition-colors"
          >
            Remover este gateway
          </button>
        </div>
      )}
    </div>
  )
}
