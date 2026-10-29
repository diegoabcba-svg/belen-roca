import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { useCatalog, useTitle } from '../hooks/useCatalog'
import FeaturedProducts from '../components/FeaturedProducts'

export default function Home() {
  useTitle(`${site.name} | ${site.tagline}`)
  const { categories } = useCatalog()
  const h = site.hero

  return (
    <>
      <section className="relative">
        <img src="/hero-mobile.jpg" alt={h.title} className="block md:hidden h- w-full object-cover" />
        <img src={h.image} alt={h.title} className="hidden md:block h- min-h-88 w-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-start pt-[15%] md:pt-[18%] bg-black/30 px-4 text-center text-white">
         <h2 className="font-display text-4xl md:text-6xl uppercase" style={{ fontFamily: "'Bodoni Moda', serif" }}>{h.title}</h2>
         <p className="mt-3 tracking-widest text-base md:text-lg uppercase text-red-600 font-extrabold" style={{ fontFamily: "'Bodoni Moda', serif" }}>{h.subtitle}</p>
          <Link to="/joyeria" className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest text-sm rounded transition">
            {h.cta}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-12">  
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {categories.filter(c => !c.parent_id).map(c => (
            <Link key={c.id} to={`/joyeria?cat=${c.slug}`} className="group text-center">
              <div className="aspect-square overflow-hidden bg-soft rounded-card">
                {c.image_url && <img src={c.image_url} alt={c.name} loading="lazy" className="size-full object-cover group-hover:scale-105 transition" />}
              </div>
  
            </Link>
          ))}
        </div>
      </section>

      <FeaturedProducts />
    </>
  )
}
