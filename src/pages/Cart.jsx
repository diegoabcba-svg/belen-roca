import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { cartMsg, money, waLink } from '../lib/format'
import { useTitle } from '../hooks/useCatalog'
export default function Cart() {
  useTitle('Carrito | BELÉN ROCA')
  const { items, setQty, remove, clear, total } = useCart()
  if (!items.length) return <div className="p-16 text-center"><p>Tu carrito está vacío.</p><Link to="/joyeria" className="btn mt-4">VER PRODUCTOS</Link></div>
  return (<div className="mx-auto max-w-3xl px-4 py-8"><h1 className="mb-4 font-display text-3xl">Carrito</h1>
    {items.map(i => <div key={i.id} className="flex items-center gap-3 border-b py-3 text-sm">
      <Link to={`/producto/${i.slug}`} className="flex-1">{i.name}<br /><span className="text-muted">{money(i.price)}</span></Link>
      <button className="btn btn-outline !min-h-9 !px-3" onClick={() => setQty(i.id, i.qty - 1)}>−</button><span>{i.qty}</span><button className="btn btn-outline !min-h-9 !px-3" onClick={() => setQty(i.id, i.qty + 1)}>+</button>
      <b className="w-24 text-right">{money(i.price * i.qty)}</b><button onClick={() => remove(i.id)} aria-label="Eliminar">✕</button></div>)}
    <p className="mt-4 text-right text-lg">Subtotal: {money(total)}</p><p className="text-right text-xl"><b>Total: {money(total)}</b></p>
    <div className="mt-6 flex gap-3"><button onClick={clear} className="btn btn-outline">VACIAR</button>
      <a href={waLink(cartMsg(items))} target="_blank" rel="noreferrer" className="btn flex-1 !bg-primary">FINALIZAR COMPRA</a></div></div>)
}
