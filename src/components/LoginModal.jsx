import { useState } from 'react'

export default function LoginModal({ onConfirm, onFechar, ocultarCancelar = false }) {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const ok = onConfirm(senha)
    if (!ok) {
      setErro(true)
      setSenha('')
      setTimeout(() => setErro(false), 1500)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-surface rounded-2xl shadow-xl p-6 w-80 space-y-4 border border-black/10">
        <div>
          <h2 className="text-base font-bold text-gray-900">Acesso Admin</h2>
          <p className="text-xs text-muted mt-0.5">Digite a senha para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            autoFocus
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={`w-full bg-surface-2 border rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors ${
              erro ? 'border-red-400 bg-red-50' : 'border-black/10 focus:border-accent'
            }`}
          />
          {erro && <p className="text-xs text-red-500">Senha incorreta</p>}
          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-accent text-white rounded-lg text-sm font-semibold"
            >
              Entrar
            </button>
            {!ocultarCancelar && (
              <button
                type="button"
                onClick={onFechar}
                className="flex-1 py-2.5 bg-surface-2 border border-black/10 rounded-lg text-sm text-muted"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
