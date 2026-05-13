export default function ConsultorConfig({ consultor, onChange }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Seu nome"
        value={consultor.nome}
        onChange={(e) => onChange({ ...consultor, nome: e.target.value })}
        className="flex-1 bg-surface-2 border border-black/10 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-muted focus:outline-none focus:border-accent"
      />
      <input
        type="tel"
        placeholder="WhatsApp"
        value={consultor.whatsapp}
        onChange={(e) => onChange({ ...consultor, whatsapp: e.target.value })}
        className="flex-1 bg-surface-2 border border-black/10 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-muted focus:outline-none focus:border-accent"
      />
    </div>
  )
}
