import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { useCatalog, useTitle } from '../hooks/useCatalog'
import ProductCard from '../components/ProductCard'
export default function Home() {
  useTitle(`${site.name} | ${site.tagline}`)
  const { products, categories } = useCatalog(), h = site.hero
  return (<>
  <section className="relative w-full max-w-[100vw] overflow-hidden bg-black">
  <picture>
    <source media="(max-width: 768px)" srcSet="/hero-mobile.jpg" />
    <img src="/hero.jpg" alt={h.title} className="h-[32vh] min-h-[220px] md:h-[60vh] lg:h-[70vh] w-full max-w-full object-contain md:object-cover object-center" />
    </section>
    <section className="mx-auto max-w-7xl px-4 pt-12">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-6">{categories.filter(c => !c.parent_id).map(c => (
        <Link key={c.id} to={`/joyeria?cat=${c.slug}`} className="group text-center">
          <div className="aspect-square overflow-hidden bg-soft rounded-card">{c.image_url && <img src={c.image_url} alt={c.name} loading="lazy" className="size-full object-cover" />}</div>
          <p className="mt-2 text-xs tracking-widest">{c.name.toUpperCase()}</p></Link>))}</div>
    </section>
    <section className="mx-auto max-w-7xl px-4 pt-12">
      <h2 className="mb-6 text-center font-display text-3xl">Productos destacados</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{products.filter(p => p.featured).slice(0, 8).map(p => <ProductCard key={p.id} p={p} />)}</div>
    </section>
  </>)
}
