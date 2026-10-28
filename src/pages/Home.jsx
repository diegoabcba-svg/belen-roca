import { Link } from 'react-router-dom'
import { site } from '../config/site'

export default function Home() {
  const h = site.hero
  return (
    <>
      <section className="relative w-full max-w-[100vw] overflow-hidden bg-black">
        <picture>
          <source media="(max-width: 768px)" srcSet="/hero-mobile.jpg" />
          <img src="/hero.jpg" alt={h.title} className="h-[32vh] min-h-[220px] md:h-[60vh] lg:h-[70vh] w-full max-w-full object-contain md:object-cover object-center" />
        </picture>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4 text-center text-white">
          <h1 className="font-display text-4xl md:text-6xl">{h.title}</h1>
          <p className="mt-2 tracking-widest">{h.subtitle}</p>
          <Link to="/catalogo" className="mt-6 rounded-full bg-white px-8 py-3 text-sm tracking-widest text-black hover:bg-white/90">{h.cta}</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="font-display text-2xl">Productos destacados</h2>
        <p className="mt-2 text-white/60">Descubrí lo último en joyería y moda circular</p>
      </section>
    </>
  )
}
