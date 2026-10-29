import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCatalog, useTitle } from '../hooks/useCatalog'
import ProductCard from '../components/ProductCard'
import { discount } from '../lib/format'
export default function Catalog() {
   
  const { products, categories } = useCatalog(), [sp, setSp] = useSearchParams(), [show, setShow] = useState(false)
  const cat = sp.get('cat') || '', q = (sp.get('q') || '').toLowerCase(), sort = sp.get('sort') || '', min = +sp.get('min') || 0, max = +sp.get('max') || Infinity
  const set = (k, v) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n) }
  const sel = categories.find(c => c.slug === cat)
    useTitle(`${sel?.name || 'Catalogo'} | BELEN ROCA`)
  const slugs = [cat, ...(sel ? categories.filter(c => c.parent_id === sel.id).map(c => c.slug) : [])]
  let list = products.filter(p => (!cat || slugs.includes(p.categories?.slug)) && p.name.toLowerCase().includes(q) && p.price >= min && p.price <= max && (sort !== 'ofertas' || discount(p) > 0))
  const by = { precio_asc: (a, b) => a.price - b.price, precio_desc: (a, b) => b.price - a.price, nuevos: (a, b) => b.created_at.localeCompare(a.created_at), destacados: (a, b) => b.featured - a.featured }[sort]
  if (by) list = [...list].sort(by)
  const f = (<div className="space-y-4 text-sm">
    <select value={cat} onChange={e => set('cat', e.target.value)} className="w-full border p-2"><option value="">Todas las categorías</option>{categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}</select>
    <div className="flex gap-2"><input type="number" placeholder="Mín" defaultValue={min || ''} onBlur={e => set('min', e.target.value)} className="w-full border p-2" /><input type="number" placeholder="Máx" defaultValue={max === Infinity ? '' : max} onBlur={e => set('max', e.target.value)} className="w-full border p-2" /></div>
    <button onClick={() => setSp({})} className="underline">Limpiar filtros</button></div>)
  return (<div className="mx-auto max-w-7xl px-4 py-8">
    <div className="mb-4 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl">{sel?.name || 'Catálogo'}</h1>
      <input placeholder="Buscar…" defaultValue={sp.get('q') || ''} onBlur={e => set('q', e.target.value)} className="border p-2 text-sm" />
      <select value={sort} onChange={e => set('sort', e.target.value)} className="ml-auto border p-2 text-sm"><option value="">Ordenar</option><option value="destacados">Destacados</option><option value="nuevos">Novedades</option><option value="precio_asc">Precio: menor a mayor</option><option value="precio_desc">Precio: mayor a menor</option></select>
      <button className="btn md:hidden" onClick={() => setShow(!show)}>FILTROS</button></div>
    {show && <div className="mb-4 md:hidden">{f}</div>}
    <div className="md:grid md:grid-cols-[220px_1fr] md:gap-8"><aside className="hidden md:block">{f}</aside>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{list.map(p => <ProductCard key={p.id} p={p} />)}</div></div>
  </div>)
}

