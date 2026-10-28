import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { discount, images, money } from '../lib/format'
export default function ProductCard({ p }) {
  const { add } = useCart(), img = images(p)[0], off = discount(p), ok = p.stock > 0
  return (
    <article className="flex flex-col">
      <Link to={`/producto/${p.slug}`} className="relative block aspect-square overflow-hidden bg-soft rounded-card">
        {img ? <img src={img} alt={p.name} loading="lazy" className="size-full object-cover" /> : <span className="grid size-full place-items-center text-xs tracking-widest text-muted">FOTO</span>}
        {off > 0 && <span className="absolute left-2 top-2 bg-primary px-2 py-1 text-xs text-white">-{off}%</span>}
      </Link>
      <h3 className="mt-3 text-sm">{p.name}</h3>
      <p className="text-sm"><b>{money(p.price)}</b> {p.compare_price > p.price && <s className="ml-1 text-muted">{money(p.compare_price)}</s>}</p>
      <p className={`text-xs ${ok ? 'text-muted' : 'text-primary'}`}>{ok ? 'En stock' : 'Sin stock'}</p>
      <button disabled={!ok} onClick={() => add(p)} className="btn mt-2 disabled:opacity-40">AGREGAR AL CARRITO</button>
      <Link to={`/producto/${p.slug}`} className="mt-1 text-center text-xs underline">Ver producto</Link>
    </article>
  )
}
