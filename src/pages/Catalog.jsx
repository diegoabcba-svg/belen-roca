import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    if (cat) setSelectedCategory(cat);
    loadData();
  }, []);

  async function loadData() {
    try {
      const { data: cats } = await supabase.from('categories').select('*');
      if (cats) setCategories(cats);
      const { data: prods } = await supabase.from('products').select('*, product_images(image_url)').eq('active', true).limit(100);
      if (prods) setProducts(prods);
    } catch (e) {
      setError(e.message);
    }
  }

  const filtered = products.filter(p => {
    if (!selectedCategory) return true;
    const cat = categories.find(c => c.slug === selectedCategory);
    if (!cat) return true;
    // Si selecciona padre, mostrar hijos también
    if (!cat.parent_id) {
      return p.category_id === cat.id || categories.find(c => c.id === p.category_id)?.parent_id === cat.id;
    }
    return p.category_id === cat.id;
  });

  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full border border-black px-3 py-2 text-sm">
            <option value="">Todas las categorías</option>
            <optgroup label="Ropa de marca">
              <option value="ropa-de-marca-nueva">Ropa nueva</option>
              <option value="ropa-de-marca-moda-circular">Moda circular</option>
            </optgroup>
            <optgroup label="Ropa genérica">
              <option value="generica-ropa-nueva">Ropa nueva</option>
              <option value="generica-moda-circular">Moda circular</option>
            </optgroup>
            <optgroup label="Joyas">
              <option value="joyas-plata-925">Plata 925</option>
              <option value="joyas-acero-quirurgico">Acero quirúrgico</option>
            </optgroup>
          </select>
          <p className="text-[11px] text-neutral-500 mt-2">{filtered.length} productos</p>
        </div>
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
