export const GATEWAYS_DEFAULT = [
  {
    id: 'mp_d0', nome: 'Mercado Pago', prazo: 'Na hora (D0)',
    taxaBase: 4.99, maxParcelas: 12,
    acrescimos: { 1:0, 2:6.76, 3:8.44, 4:10.23, 5:11.63, 6:13.58, 7:15.01, 8:16.90, 9:18.86, 10:20.07, 11:21.92, 12:23.75 },
  },
  {
    id: 'mp_d14', nome: 'Mercado Pago', prazo: '14 dias (D14)',
    taxaBase: 4.49, maxParcelas: 12,
    acrescimos: { 1:0, 2:5.96, 3:7.64, 4:9.23, 5:10.63, 6:12.38, 7:13.81, 8:15.70, 9:17.36, 10:18.57, 11:20.42, 12:22.25 },
  },
  {
    id: 'mp_d30', nome: 'Mercado Pago', prazo: '30 dias (D30)',
    taxaBase: 3.99, maxParcelas: 12,
    acrescimos: { 1:0, 2:5.46, 3:7.14, 4:8.73, 5:10.13, 6:11.88, 7:13.31, 8:15.20, 9:16.86, 10:18.07, 11:19.92, 12:21.75 },
  },
]

export const CATEGORIAS_DEFAULT = [
  {
    id: 'iphones',
    nome: 'iPhones',
    items: [
      { id: 'iphone15', nome: 'iPhone 15', valor: 5999 },
      { id: 'iphone15pro', nome: 'iPhone 15 Pro', valor: 7999 },
      { id: 'iphone16', nome: 'iPhone 16', valor: 7499 },
      { id: 'iphone16pro', nome: 'iPhone 16 Pro', valor: 9999 },
      { id: 'iphone17', nome: 'iPhone 17', valor: 10999 },
    ],
  },
  {
    id: 'macbooks',
    nome: 'MacBooks',
    items: [
      { id: 'mba-m3', nome: 'MacBook Air M3', valor: 10999 },
      { id: 'mba-m4', nome: 'MacBook Air M4', valor: 12999 },
      { id: 'mbp-m4', nome: 'MacBook Pro M4', valor: 16999 },
    ],
  },
  {
    id: 'smartwatch',
    nome: 'Apple Watch',
    items: [
      { id: 'aw-se', nome: 'Apple Watch SE', valor: 2799 },
      { id: 'aw-s10', nome: 'Apple Watch Series 10', valor: 4999 },
      { id: 'aw-ultra2', nome: 'Apple Watch Ultra 2', valor: 7999 },
    ],
  },
]

export const PARCELAS_POPULARES = [6, 10, 12]
export const MAX_PARCELAS_DEFAULT = 18
