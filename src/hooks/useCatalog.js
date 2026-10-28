import { useEffect, useState } from 'react'
import { getCatalog } from '../services/products'
export function useCatalog() {
  const [d, setD] = useState({ products: [], categories: [], loading: true })
  useEffect(() => { getCatalog().then(r => setD({ ...r, loading: false })) }, [])
  return d
}
export function useTitle(t) { useEffect(() => { document.title = t }, [t]) }
