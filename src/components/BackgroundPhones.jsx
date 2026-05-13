function IPhoneSVG({ style }) {
  return (
    <svg
      viewBox="0 0 90 185"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      {/* Corpo */}
      <rect
        x="1.5" y="1.5" width="87" height="182"
        rx="18" ry="18"
        stroke="currentColor" strokeWidth="3"
      />
      {/* Botões laterais esquerda */}
      <rect x="-1.5" y="52" width="3" height="22" rx="1.5" fill="currentColor" opacity="0.6" />
      <rect x="-1.5" y="82" width="3" height="32" rx="1.5" fill="currentColor" opacity="0.6" />
      {/* Botão lateral direita */}
      <rect x="88.5" y="62" width="3" height="38" rx="1.5" fill="currentColor" opacity="0.6" />
      {/* Dynamic Island */}
      <rect x="30" y="12" width="30" height="10" rx="5" fill="currentColor" opacity="0.7" />
      {/* Câmera traseira (outline) */}
      <rect x="12" y="18" width="36" height="36" rx="10" stroke="currentColor" strokeWidth="2.5" opacity="0.3" />
      <circle cx="25" cy="30" r="7" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <circle cx="38" cy="30" r="7" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <circle cx="25" cy="43" r="7" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      {/* Home indicator */}
      <rect x="32" y="172" width="26" height="4" rx="2" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

const PHONES = [
  {
    style: {
      position: 'absolute', top: '-60px', left: '-40px',
      width: '220px', transform: 'rotate(-18deg)',
      opacity: 0.06,
    },
  },
  {
    style: {
      position: 'absolute', top: '80px', right: '-50px',
      width: '180px', transform: 'rotate(12deg)',
      opacity: 0.05,
    },
  },
  {
    style: {
      position: 'absolute', bottom: '120px', left: '-30px',
      width: '150px', transform: 'rotate(-8deg)',
      opacity: 0.04,
    },
  },
  {
    style: {
      position: 'absolute', bottom: '-40px', right: '-20px',
      width: '200px', transform: 'rotate(22deg)',
      opacity: 0.06,
    },
  },
  {
    style: {
      position: 'absolute', top: '45%', left: '50%',
      width: '260px', transform: 'translateX(-50%) rotate(-5deg)',
      opacity: 0.03,
    },
  },
]

export default function BackgroundPhones() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        color: '#1D6FF0',
      }}
    >
      {PHONES.map((p, i) => (
        <IPhoneSVG key={i} style={p.style} />
      ))}
    </div>
  )
}
