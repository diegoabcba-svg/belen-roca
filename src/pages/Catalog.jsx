import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    if (cat) setSelectedCategory(cat);
    fetchCategories();
    fetchProducts();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('name');
    if (data) setCategories(data);
  }

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*, product_images(image_url)').eq('active', true);
    if (data) setProducts(data);
  }

  const filtered = products.filter(p => {
    if (selectedCategory && p.category_id) {
      const cat = categories.find(c => c.id === p.category_id || c.slug === selectedCategory);
      // Soporta filtro por slug o por id, y por padre
      if (cat) {
        if (cat.slug !== selectedCategory && cat.id !== parseInt(selectedCategory)) {
          // Si es filtro por padre (ropa-de-marca, ropa-generica, joyas), mostrar hijos
          const parent = categories.find(pr => pr.slug === selectedCategory);
          if (parent && p.category_id !== parent.id && categories.find(c => c.id === p.category_id)?.parent_id !== parent.id) {
            // Check si pertenece a hijo del padre seleccionado
            const childCat = categories.find(c => c.id === p.category_id);
            if (!childCat || childCat.parent_id !== parent.id) {
              if (p.categories?.slug !== selectedCategory) {
                // Fallback por slug directo
                if (p.category_id && categories.find(c => c.id === p.category_id)?.slug !== selectedCategory) {
                  return false;
                }
              }
            }
          }
        }
      } else {
        // Filtro directo por slug en URL
        if (p.categories?.slug !== selectedCategory) {
          // Intentar match por slug de categoria del producto
          const prodCat = categories.find(c => c.id === p.category_id);
          if (prodCat?.slug !== selectedCategory) return false;
        }
      }
    }
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (minPrice && p.price < parseInt(minPrice)) return false;
    if (maxPrice && p.price > parseInt(maxPrice)) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div>
          <input type="text" placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} className="w-full border border-black px-3 py-2 text-sm" />
        </div>
        
        <div>
          <label className="text-xs uppercase font-semibold mb-2 block">Categorías</label>
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
        </div>

        <div>
          <label className="text-xs uppercase font-semibold mb-2 block">Precio</label>
          <div className="flex gap-2">
            <input type="number" placeholder="Mín $" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full border px-2 py-2 text-sm" />
            <input type="number" placeholder="Máx $" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full border px-2 py-2 text-sm" />
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
