import ClienteProdutos from '../components/ClienteProdutos.jsx'
import ParcelasSlider from '../components/ParcelasSlider.jsx'
import ResultadoHero from '../components/ResultadoHero.jsx'

export default function ClienteScreen({
  categorias, selectedItem, onSelectItem,
  maxParcelas, parcelas, onParcelas,
  calculo, consultor, bancoNome,
  valorValido,
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Simulador de Parcelas</h1>
          <p className="text-xs text-muted">Spoli Agency</p>
        </div>
      </div>

      {/* Produtos por categoria */}
      <ClienteProdutos
        categorias={categorias}
        selectedItem={selectedItem}
        onSelect={onSelectItem}
      />

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
      />
    </div>
  )
}
