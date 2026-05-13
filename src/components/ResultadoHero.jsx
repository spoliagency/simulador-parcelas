import { useRef, useEffect, useState } from 'react'

export default function ResultadoHero({
  pmtFormatado,
  parcelas,
  bancoNome,
  porDiaFormatado,
  porSemanaFormatado,
  investimentoTotalFormatado,
  produtoNome,
  consultor,
  valorValido,
}) {
  const valueRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const el = valueRef.current
    if (!el) return
    el.classList.remove('animate-pulse-value')
    void el.offsetWidth
    el.classList.add('animate-pulse-value')
  }, [pmtFormatado])

  function handleCopy() {
    const whatsapp = consultor?.whatsapp?.trim() || '(não informado)'
    const texto =
      `✅ *${produtoNome}* em *${parcelas}×* de *${pmtFormatado}*\n` +
      `Investimento total: ${investimentoTotalFormatado}\n` +
      `Entre em contato para fechar: ${whatsapp}`

    const confirm = () => { setCopied(true); setTimeout(() => setCopied(false), 2000) }

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(texto).then(confirm).catch(() => fallbackCopy(texto, confirm))
    } else {
      fallbackCopy(texto, confirm)
    }
  }

  function fallbackCopy(texto, onDone) {
    const el = document.createElement('textarea')
    el.value = texto
    el.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    onDone()
  }

  if (!valorValido) {
    return (
      <div className="bg-surface rounded-2xl p-6 text-center text-muted text-sm">
        Selecione um produto e banco para ver a simulação
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-2xl p-6 space-y-4 shadow-sm border border-black/5">
      {/* Hero: parcela */}
      <div className="text-center space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          por apenas
        </p>
        <div
          ref={valueRef}
          className="font-mono text-[48px] font-bold text-accent leading-none"
        >
          {pmtFormatado}
        </div>
        <p className="text-base text-gray-500">
          em {parcelas}×
        </p>
      </div>

      {/* Reframings */}
      <div className="border-t border-black/8 pt-4 text-center text-sm text-muted">
        equivale a{' '}
        <span className="text-gray-800 font-medium">{porDiaFormatado}/dia</span>
      </div>

      {/* Total — secondary, neutral language */}
      <div className="text-center text-xs text-muted">
        investimento total:{' '}
        <span className="font-mono">{investimentoTotalFormatado}</span>
      </div>

      {/* CTA */}
      <button
        onClick={handleCopy}
        className="w-full py-3 rounded-xl font-semibold text-sm transition-all bg-accent text-white hover:bg-blue-600 active:scale-95"
      >
        {copied ? '✅ Copiado!' : '📋 Copiar proposta'}
      </button>
    </div>
  )
}
