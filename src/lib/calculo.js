export function calcularParcela(precoVista, taxaBase, acrescimo, nParcelas) {
  if (precoVista <= 0 || nParcelas <= 0) return { valorParcela: 0, totalComprador: 0, liquidoVendedor: 0 }
  const precoGross = precoVista / (1 - taxaBase / 100)
  const totalComprador = precoGross * (1 + acrescimo / 100)
  const valorParcela = totalComprador / nParcelas
  const liquidoVendedor = totalComprador * (1 - taxaBase / 100)
  return { valorParcela, totalComprador, liquidoVendedor }
}
