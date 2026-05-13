import { useRef, useEffect, useState, useCallback } from 'react'

const PARTICLES = ['🎉']

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
  entrada = 0,
}) {
  const valueRef = useRef(null)
  const containerRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const el = valueRef.current
    if (!el) return
    el.classList.remove('animate-pulse-value')
    void el.offsetWidth
    el.classList.add('animate-pulse-value')
  }, [pmtFormatado])

  const entradaFormatado = entrada > 0
    ? entrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : null

  const dispararComemora = useCallback(() => {
    const total = 16
    const novos = Array.from({ length: total }, (_, i) => {
      const angulo = (360 / total) * i + (Math.random() - 0.5) * 20
      const rad = angulo * (Math.PI / 180)
      const dist = 70 + Math.random() * 80
      return {
        id: Date.now() + i,
        emoji: PARTICLES[0],
        x: 50,
        dx: Math.cos(rad) * dist,
        dy: Math.sin(rad) * dist,
        rot: (Math.random() - 0.5) * 360,
        size: 16 + Math.random() * 14,
        delay: Math.random() * 80,
      }
    })
    setParticles(novos)
    setTimeout(() => setParticles([]), 900)
  }, [])

  function handleCopy() {
    const whatsapp = consultor?.whatsapp?.trim()
    const entradaLinha = entradaFormatado ? `Entrada: ${entradaFormatado} à vista\n` : ''
    const contatoLinha = whatsapp ? `Entre em contato para fechar: ${whatsapp}` : ''
    const texto = (
      `✅ *${produtoNome}*\n` +
      entradaLinha +
      `*${parcelas}×* de *${pmtFormatado}*\n` +
      `Investimento total: ${investimentoTotalFormatado}\n` +
      contatoLinha
    ).trimEnd()

    const confirm = () => {
      setCopied(true)
      dispararComemora()
      setTimeout(() => setCopied(false), 2000)
    }

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
    <div ref={containerRef} className="bg-surface rounded-2xl p-6 space-y-4 shadow-sm border border-black/5 relative overflow-visible">
      {/* Partículas de comemoração */}
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: '30%',
            fontSize: p.size,
            pointerEvents: 'none',
            animation: `particle-fly 0.85s cubic-bezier(0.2, 0.8, 0.4, 1) forwards`,
            animationDelay: `${p.delay}ms`,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            '--rot': `${p.rot}deg`,
            zIndex: 50,
          }}
        >
          {p.emoji}
        </span>
      ))}

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
          {entradaFormatado
            ? <><span className="text-xs text-muted">entrada {entradaFormatado} + </span>mais {parcelas}×</>
            : <>em {parcelas}×</>
          }
        </p>
      </div>

      {/* Total */}
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
