import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    const valueToStore = typeof value === 'function' ? value(storedValue) : value
    setStoredValue(valueToStore)
    try {
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch {
      // quota exceeded — fail silently
    }
  }

  return [storedValue, setValue]
}
