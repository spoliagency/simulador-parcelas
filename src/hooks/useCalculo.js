import { calcularParcela } from '../lib/calculo.js'
import { formatBRL } from '../lib/formatters.js'

export function useCalculo(precoVista, taxaBase, acrescimo, nParcelas) {
  const { valorParcela, totalComprador, liquidoVendedor } = calcularParcela(precoVista, taxaBase, acrescimo, nParcelas)

  return {
    pmt: valorParcela,
    pmtFormatado: formatBRL(valorParcela),
    porDiaFormatado: formatBRL(totalComprador / 30),
    porSemanaFormatado: formatBRL(totalComprador / 4.33),
    investimentoTotalFormatado: formatBRL(totalComprador),
    investimentoTotal: totalComprador,
    liquidoVendedor,
    liquidoVendedorFormatado: formatBRL(liquidoVendedor),
  }
}
