# Simulador de Parcelamento — CLAUDE.md

## Objetivo de negócio
Ferramenta de vendas usada por consultores durante negociação com clientes.
Hero metric = VALOR DA PARCELA. Nunca o total pago.

## Stack
- React 18 + Vite 5 + Tailwind CSS v4 (`@tailwindcss/vite`)
- Sem backend — tudo client-side
- localStorage com prefixo `spoli_simulador_`

## Comandos
- `npm run dev` — dev server em http://localhost:5173
- `npm run build` — build de produção em dist/
- `npm test` — testes unitários (vitest)
- `vercel deploy` — deploy

## Regras obrigatórias
1. **NUNCA** usar linguagem que desencoraje a compra: proibido "juros", "custo extra", "acréscimo", "você vai pagar a mais"
2. O valor da parcela (PMT) **SEMPRE** deve ser o elemento visualmente mais proeminente
3. Total pago: linguagem neutra "investimento total" — nunca em destaque
4. localStorage usa **SOMENTE** prefixo `spoli_simulador_`
5. Fórmula Price em `src/lib/calculo.js` — não duplicar em componentes

## Arquitetura
- Estado centralizado em `src/App.jsx`
- Lógica pura e testável em `src/lib/calculo.js`
- Formatação BRL em `src/lib/formatters.js`
- Dados default em `src/data/defaults.js`
- Componentes são display-only (sem estado de negócio)
- Hooks em `src/hooks/` — `useLocalStorage` e `useCalculo`

## Tema
- Fundo: `#0A0A0A`
- Acento (vermelho Spoli): `#FF1A1A` → classe `text-accent`, `bg-accent`
- Surface: `#111111` → `bg-surface`
- Surface secundário: `#1A1A1A` → `bg-surface-2`
- Muted: `#888888` → `text-muted`
- Fonte valores: `font-mono`
