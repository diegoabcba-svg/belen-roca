import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function loadRandom() {
      // Tus 30 joyas de Plata 925 (category_id 14)
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (image_url)
        `)
        .eq('active', true)
        .eq('category_id', 14)
        .limit(30);

      if (error) {
        console.error(error);
        return;
      }

      // Mezcla aleatoria cada vez que entra alguien
      const shuffled = [...(data || [])]
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
      
      setProductos(shuffled);
    }
    loadRandom();
  }, []);

  if (productos.length === 0) return null;

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bodoni text-center mb-6" style={{fontFamily: 'Bodoni Moda'}}>
        Productos destacados
      </h2>
      <div 
        className="flex overflow-x-auto gap-4 px-4 pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none'
        }}
      >
        {productos.map((p) => (
          <div 
            key={p.id} 
            className="min-w- flex-shrink-0"
            style={{scrollSnapAlign: 'start'}}
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
