import ClienteProdutos from '../components/ClienteProdutos.jsx'
import ParcelasSlider from '../components/ParcelasSlider.jsx'
import ResultadoHero from '../components/ResultadoHero.jsx'

export default function ClienteScreen({
  categorias, selectedItem, onSelectItem,
  entrada, onEntrada, valorAtual,
  maxParcelas, parcelas, onParcelas,
  calculo, consultor, bancoNome,
  valorValido,
}) {
  function handleEntrada(e) {
    const v = parseFloat(e.target.value) || 0
    onEntrada(Math.min(v, valorAtual))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Simulador de Parcelas</h1>
          {consultor.nomeLoja && (
            <p className="text-xs text-muted">{consultor.nomeLoja}</p>
          )}
        </div>
      </div>

      {/* Produtos por categoria */}
      <ClienteProdutos
        categorias={categorias}
        selectedItem={selectedItem}
        onSelect={onSelectItem}
      />

      {/* Entrada */}
      {valorAtual > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-muted">
            Valor de entrada <span className="normal-case font-normal">(opcional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">R$</span>
            <input
              type="number"
              min="0"
              max={valorAtual}
              step="0.01"
              placeholder="0,00"
              value={entrada || ''}
              onChange={handleEntrada}
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-black/10 rounded-xl text-sm font-mono text-gray-900 placeholder-muted focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      )}

      {/* Parcelas */}
      <ParcelasSlider parcelas={parcelas} onChange={onParcelas} max={maxParcelas} />

      {/* Resultado */}
      <ResultadoHero
        pmtFormatado={calculo.pmtFormatado}
        parcelas={parcelas}
        bancoNome={bancoNome}
        porDiaFormatado={calculo.porDiaFormatado}
        porSemanaFormatado={calculo.porSemanaFormatado}
        investimentoTotalFormatado={calculo.investimentoTotalFormatado}
        produtoNome={selectedItem?.nome ?? ''}
        consultor={consultor}
        valorValido={valorValido}
        entrada={entrada}
      />
    </div>
  )
}
