import { useState } from 'react'
import ConsultorConfig from '../components/ConsultorConfig.jsx'
import GatewayConfig from '../components/GatewayConfig.jsx'
import ProdutoConfig from '../components/ProdutoConfig.jsx'

export default function AdminScreen({
  consultor, onConsultor,
  gateways, selectedGateway, onSelectGateway, onAddGateway, onUpdateGateway, onRemoveGateway,
  categorias, onAddCategoria, onRemoveCategoria, onAddItem, onRemoveItem,
  onSenha,
  onVoltar,
}) {
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmSenha, setConfirmSenha] = useState('')
  const [senhaMsg, setSenhaMsg] = useState(null)

  function handleTrocarSenha() {
    if (!novaSenha || novaSenha.length < 4) {
      setSenhaMsg({ tipo: 'erro', texto: 'Mínimo 4 caracteres' })
      return
    }
    if (novaSenha !== confirmSenha) {
      setSenhaMsg({ tipo: 'erro', texto: 'Senhas não coincidem' })
      return
    }
    onSenha(novaSenha)
    setNovaSenha('')
    setConfirmSenha('')
    setSenhaMsg({ tipo: 'ok', texto: 'Senha atualizada!' })
    setTimeout(() => setSenhaMsg(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onVoltar}
          className="p-2 rounded-lg text-muted hover:text-accent hover:bg-surface-2 transition-colors"
          aria-label="Voltar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Configurações</h1>
          <p className="text-xs text-muted">Admin</p>
        </div>
      </div>

      {/* Consultor */}
      <div className="bg-surface rounded-2xl p-4 space-y-3 shadow-sm border border-black/5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Consultor</p>
        <ConsultorConfig consultor={consultor} onChange={onConsultor} />
      </div>

      {/* Gateway / Maquininha */}
      <div className="bg-surface rounded-2xl p-4 space-y-4 shadow-sm border border-black/5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          Gateway / Maquininha
        </p>
        <GatewayConfig
          gateways={gateways}
          selectedGateway={selectedGateway}
          onSelect={onSelectGateway}
          onAdd={onAddGateway}
          onUpdate={onUpdateGateway}
          onRemove={onRemoveGateway}
        />
      </div>

      {/* Produtos por categoria */}
      <div className="bg-surface rounded-2xl p-4 shadow-sm border border-black/5">
        <ProdutoConfig
          categorias={categorias}
          onAddCategoria={onAddCategoria}
          onRemoveCategoria={onRemoveCategoria}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
      </div>

      {/* Senha do admin */}
      <div className="bg-surface rounded-2xl p-4 space-y-3 shadow-sm border border-black/5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Senha de acesso</p>
        <input
          type="password"
          placeholder="Nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          className="w-full bg-surface-2 border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
        />
        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmSenha}
          onChange={(e) => setConfirmSenha(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleTrocarSenha()}
          className="w-full bg-surface-2 border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
        />
        {senhaMsg && (
          <p className={`text-xs ${senhaMsg.tipo === 'ok' ? 'text-green-600' : 'text-red-500'}`}>
            {senhaMsg.texto}
          </p>
        )}
        <button
          onClick={handleTrocarSenha}
          className="w-full py-2 bg-surface-2 border border-black/10 rounded-lg text-sm text-accent hover:border-accent transition-colors"
        >
          Atualizar senha
        </button>
      </div>

      {/* Botão voltar */}
      <button
        onClick={onVoltar}
        className="w-full py-3 rounded-xl font-semibold text-sm bg-accent text-white hover:bg-blue-600 active:scale-95 transition-all"
      >
        Ir para o simulador →
      </button>
    </div>
  )
}
