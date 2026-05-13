import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { useCalculo } from './hooks/useCalculo.js'
import { GATEWAYS_DEFAULT, CATEGORIAS_DEFAULT } from './data/defaults.js'
import BackgroundPhones from './components/BackgroundPhones.jsx'
import ClienteScreen from './screens/ClienteScreen.jsx'

export default function App() {
  const [gateways] = useLocalStorage('spoli_simulador_gateways', GATEWAYS_DEFAULT)
  const [categorias] = useLocalStorage('spoli_simulador_categorias', CATEGORIAS_DEFAULT)
  const [consultor] = useLocalStorage('spoli_simulador_consultor', { nome: '', whatsapp: '' })

  const [selectedGateway] = useState(GATEWAYS_DEFAULT[0])
  const [selectedItem, setSelectedItem] = useState(CATEGORIAS_DEFAULT[0]?.items[0] ?? null)
  const [parcelas, setParcelas] = useState(6)
  const [entrada, setEntrada] = useState(0)

  const gatewayAtivo = gateways.find((g) => g.id === selectedGateway?.id) ?? gateways[0] ?? null
  const maxParcelas = gatewayAtivo?.maxParcelas ?? 12
  const valorAtual = selectedItem?.valor ?? 0
  const valorFinanciado = Math.max(0, valorAtual - entrada)
  const valorValido = valorAtual > 0 && gatewayAtivo != null
  const acrescimoAtivo = gatewayAtivo?.acrescimos?.[parcelas] ?? 0
  const calculo = useCalculo(valorFinanciado, gatewayAtivo?.taxaBase ?? 0, acrescimoAtivo, parcelas)

  function handleSelectItem(item) {
    setSelectedItem(item)
    setEntrada(0)
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F0F2F5]">
      <BackgroundPhones />
      <div className="w-full max-w-[480px] px-4 py-6 relative z-10">
        <ClienteScreen
          categorias={categorias}
          selectedItem={selectedItem}
          onSelectItem={handleSelectItem}
          entrada={entrada}
          onEntrada={setEntrada}
          valorAtual={valorAtual}
          maxParcelas={maxParcelas}
          parcelas={parcelas}
          onParcelas={setParcelas}
          calculo={calculo}
          consultor={consultor}
          bancoNome={gatewayAtivo?.nome ?? ''}
          valorValido={valorValido}
        />
      </div>
    </div>
  )
}
