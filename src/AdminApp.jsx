import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { useSenhaAdmin } from './hooks/useSenhaAdmin.js'
import { GATEWAYS_DEFAULT, CATEGORIAS_DEFAULT } from './data/defaults.js'
import BackgroundPhones from './components/BackgroundPhones.jsx'
import LoginModal from './components/LoginModal.jsx'
import AdminScreen from './screens/AdminScreen.jsx'

export default function AdminApp() {
  const [autenticado, setAutenticado] = useState(false)

  const [gateways, setGateways] = useLocalStorage('spoli_simulador_gateways', GATEWAYS_DEFAULT)
  const [categorias, setCategorias] = useLocalStorage('spoli_simulador_categorias', CATEGORIAS_DEFAULT)
  const [consultor, setConsultor] = useLocalStorage('spoli_simulador_consultor', { nome: '', whatsapp: '' })
  const [selectedGateway, setSelectedGateway] = useState(GATEWAYS_DEFAULT[0])

  const { verificar, setSenha } = useSenhaAdmin()

  function handleConfirmarSenha(tentativa) {
    if (verificar(tentativa)) {
      setAutenticado(true)
      return true
    }
    return false
  }

  // ── Gateway handlers ─────────────────────────────────────────
  function handleAddGateway(gateway) {
    setGateways((prev) => [...prev, gateway])
    setSelectedGateway(gateway)
  }

  function handleRemoveGateway(id) {
    setGateways((prev) => prev.filter((g) => g.id !== id))
    if (selectedGateway?.id === id) {
      setSelectedGateway(gateways.find((g) => g.id !== id) ?? null)
    }
  }

  function handleUpdateGateway(gateway) {
    setGateways((prev) => prev.map((g) => g.id === gateway.id ? gateway : g))
    if (selectedGateway?.id === gateway.id) setSelectedGateway(gateway)
  }

  // ── Categoria handlers ───────────────────────────────────────
  function handleAddCategoria(cat) {
    setCategorias((prev) => [...prev, cat])
  }

  function handleRemoveCategoria(catId) {
    setCategorias((prev) => prev.filter((c) => c.id !== catId))
  }

  function handleAddItem(catId, item) {
    setCategorias((prev) =>
      prev.map((c) => c.id === catId ? { ...c, items: [...c.items, item] } : c)
    )
  }

  function handleRemoveItem(catId, itemId) {
    setCategorias((prev) =>
      prev.map((c) =>
        c.id === catId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c
      )
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F0F2F5]">
      <BackgroundPhones />

      {!autenticado ? (
        <LoginModal
          onConfirm={handleConfirmarSenha}
          onFechar={() => {}}
          ocultarCancelar
        />
      ) : (
        <div className="w-full max-w-[480px] px-4 py-6 relative z-10">
          <AdminScreen
            consultor={consultor}
            onConsultor={setConsultor}
            gateways={gateways}
            selectedGateway={selectedGateway}
            onSelectGateway={setSelectedGateway}
            onAddGateway={handleAddGateway}
            onUpdateGateway={handleUpdateGateway}
            onRemoveGateway={handleRemoveGateway}
            categorias={categorias}
            onAddCategoria={handleAddCategoria}
            onRemoveCategoria={handleRemoveCategoria}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onSenha={setSenha}
            onVoltar={() => setAutenticado(false)}
          />
        </div>
      )}
    </div>
  )
}
