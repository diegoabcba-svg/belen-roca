import { createContext, useContext, useEffect, useState } from 'react'
const Ctx = createContext()
export const useCart = () => useContext(Ctx)
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => { try { return JSON.parse(localStorage.getItem('cart')) || [] } catch { return [] } })
  useEffect(() => localStorage.setItem('cart', JSON.stringify(items)), [items])
  const add = (p, qty = 1) => setItems(l => l.some(i => i.id === p.id) ? l.map(i => i.id === p.id ? { ...i, qty: Math.min(i.qty + qty, p.stock || 99) } : i) : [...l, { id: p.id, slug: p.slug, name: p.name, price: p.price, qty, stock: p.stock }])
  const setQty = (id, qty) => setItems(l => l.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
  const remove = id => setItems(l => l.filter(i => i.id !== id))
  const clear = () => setItems([])
  const count = items.reduce((s, i) => s + i.qty, 0), total = items.reduce((s, i) => s + i.qty * i.price, 0)
  return <Ctx.Provider value={{ items, add, setQty, remove, clear, count, total }}>{children}</Ctx.Provider>
}
