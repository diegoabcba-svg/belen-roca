import { Link } from 'react-router-dom'
import { site } from '../config/site'

export default function Home() {
  const h = site.hero
  return (
    <div className="w-full overflow-y-auto">
      <section className="relative w-full bg-black">
        <picture>
          <source media="(max-width: 768px)" srcSet="/hero-mobile.jpg" />
          <img 
            src="/hero.jpg" 
            alt={h.title} 
            className="w-full h-auto max-h-[45vh] md:max-h-[65vh] object-contain md:object-cover object-center block"
          />
        </picture>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-4 text-center text-white">
          <h1 className="font-display text-3xl md:text-6xl">{h.title}</h1>
          <p className="mt-2 text-sm tracking-widest">{h.subtitle}</p>
          <Link to="/catalogo" className="mt-6 rounded-full bg-white px-8 py-3 text-sm tracking-widest text-black hover:bg-white/90">{h.cta}</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 bg-white text-black min-h-[60vh]">
        <h2 className="font-display text-2xl text-black">Productos destacados</h2>
        <p className="mt-2 text-black/60">Descubrí lo último en joyería y moda circular</p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-32 bg-gray-100 rounded flex items-center justify-center">Producto 1</div>
          <div className="h-32 bg-gray-100 rounded flex items-center justify-center">Producto 2</div>
          <div className="h-32 bg-gray-100 rounded flex items-center justify-center">Producto 3</div>
          <div className="h-32 bg-gray-100 rounded flex items-center justify-center">Producto 4</div>
        </div>
        <div className="mt-8">
          <Link to="/catalogo" className="text-sm underline text-black">Ver todo el catálogo →</Link>
        </div>
      </section>
    </div>
  )
}
