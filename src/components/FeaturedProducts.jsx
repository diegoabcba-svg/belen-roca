import { useMemo } from 'react'
import { useCatalog } from '../hooks/useCatalog'
import ProductCard from './ProductCard'

export default function FeaturedProducts() {
  const { products } = useCatalog()

  const randomProducts = useMemo(() => {
    if (!products || products.length === 0) return []
    return [...products]
      .filter(p => p.category_id === 14) // 14 = Plata 925, tus 30 joyas
      .sort(() => 0.5 - Math.random())
      .slice(0, 10)
  }, [products])

  if (randomProducts.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 pt-12">
      <h2 className="text-xl md:text-2xl font-display mb-4 text-center tracking-widest">PRODUCTOS DESTACADOS</h2>
      
      {/* Scroll horizontal que se ve bien en celular */}
      <div className="flex overflow-x-auto gap-3 pb-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-hide">
        {randomProducts.map(p => (
          <div 
            key={p.id} 
            className="min-w- w-[45%] md:min-w- md:w-[23%] flex-shrink-0 snap-start"
          >
            <ProductCard p={p} />
          </div>
        ))}
      </div>
      
      <p className="text-center text-xs text-gray-400 mt-2 md:hidden">← Deslizá para ver más →</p>
    </section>
  )
}
