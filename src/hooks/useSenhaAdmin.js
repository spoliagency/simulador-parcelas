import { useLocalStorage } from './useLocalStorage.js'

const SENHA_DEFAULT = 'admin123'

export function useSenhaAdmin() {
  const [senha, setSenha] = useLocalStorage('spoli_simulador_senha', SENHA_DEFAULT)

  function verificar(tentativa) {
    return tentativa === senha
  }

  return { verificar, setSenha }
}
