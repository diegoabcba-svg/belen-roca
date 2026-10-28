import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCatalog, useTitle } from '../hooks/useCatalog'
import { useCart } from '../hooks/useCart'
import ProductCard from '../components/ProductCard'
import { discount, images, money, productMsg, waLink } from '../lib/format'
export default function Product() {
  const { slug } = useParams(), { products, loading } = useCatalog(), { add } = useCart(), [qty, setQty] = useState(1), [i, setI] = useState(0)
  const p = products.find(x => x.slug === slug); useTitle(p ? `${p.name} | BELÉN ROCA` : 'BELÉN ROCA')
  if (loading) return <p className="p-10 text-center">Cargando…</p>
  if (!p) return <p className="p-10 text-center">Producto no encontrado.</p>
  const imgs = images(p), off = discount(p), ok = p.stock > 0
  return (<div className="mx-auto max-w-6xl px-4 py-8">
    <div className="grid gap-8 md:grid-cols-2">
      <div><div className="aspect-square bg-soft rounded-card overflow-hidden">{imgs[i] ? <img src={imgs[i]} alt={p.name} className="size-full object-cover" /> : <span className="grid size-full place-items-center text-xs text-muted">FOTO</span>}</div>
        <div className="mt-2 flex gap-2">{imgs.map((s, k) => <img key={k} src={s} alt={`${p.name} ${k + 1}`} loading="lazy" onClick={() => setI(k)} className="size-16 cursor-pointer object-cover" />)}</div></div>
      <div className="space-y-3"><h1 className="font-display text-4xl">{p.name}</h1>
        <p className="text-xl"><b>{money(p.price)}</b> {p.compare_price > p.price && <><s className="ml-2 text-muted">{money(p.compare_price)}</s> <span className="text-primary">-{off}%</span></>}</p>
        <p className="text-muted">{p.description}</p>
        <p className="text-sm">Material: {p.material || '-'} · Medidas: {p.size || '-'}</p>
        <p className={`text-sm ${ok ? '' : 'text-primary'}`}>{ok ? `Stock: ${p.stock}` : 'Sin stock'}</p>
        <div className="flex items-center gap-3"><button className="btn btn-outline" onClick={() => setQty(Math.max(1, qty - 1))}>−</button><span>{qty}</span><button className="btn btn-outline" onClick={() => setQty(Math.min(p.stock || 1, qty + 1))}>+</button></div>
        <button disabled={!ok} onClick={() => add(p, qty)} className="btn w-full disabled:opacity-40">AGREGAR AL CARRITO</button>
        <a href={waLink(productMsg(p, qty))} target="_blank" rel="noreferrer" className="btn btn-outline w-full">COMPRAR POR WHATSAPP</a></div></div>
    <h2 className="mb-4 mt-14 font-display text-3xl">Productos relacionados</h2>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{products.filter(r => r.id !== p.id && r.categories?.slug === p.categories?.slug).slice(0, 4).map(r => <ProductCard key={r.id} p={r} />)}</div>
  </div>)
}
