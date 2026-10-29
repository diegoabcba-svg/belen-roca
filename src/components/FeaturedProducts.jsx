import { useMemo } from 'react'
import { useCatalog } from '../hooks/useCatalog'
import ProductCard from './ProductCard'

export default function FeaturedProducts() {
  const { products } = useCatalog()

  const randomProducts = useMemo(() => {
    if (!products || products.length === 0) return []
    // Mezcla aleatoria de tus 30 joyas de Plata 925
    return [...products]
      .filter(p => p.category_id === 14) // 14 = Plata 925
      .sort(() => 0.5 - Math.random())
      .slice(0, 10)
  }, [products])

  if (randomProducts.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 pt-12">
      <h2 className="text-2xl font-display mb-6">Productos destacados</h2>
      <div className="flex overflow-x-auto gap-4 pb-4" style={{scrollSnapType:'x mandatory'}}>
        {randomProducts.map(p => (
          <div key={p.id} className="min-w- flex-shrink-0" style={{scrollSnapAlign:'start'}}>
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
