import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabaseClient';
import ProductCard from '../components/ProductCard';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [openGroups, setOpenGroups] = useState({
    'ropa-de-marca': true,
    'ropa-generica': true,
    'joyas': true
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cat = urlParams.get('cat');
    if (cat) setSelectedCategory(cat);
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('name');
    if (data) setCategories(data);
  }

  async function fetchProducts() {
    const { data } = await supabase
      .from('products')
      .select('*, product_images(image_url), categories(name, slug)')
      .eq('active', true)
      .order('created_at', { ascending: false });
    if (data) setProducts(data);
  }

  const groupedCategories = useMemo(() => {
    const parents = [
      { id: 7, slug: 'ropa-de-marca', name: 'Ropa de marca', childIds: [10, 11] },
      { id: 8, slug: 'ropa-generica', name: 'Ropa genérica', childIds: [12, 13] },
      { id: 9, slug: 'joyas', name: 'Joyas', childIds: [14, 15] }
    ];

    return parents.map(p => {
      const children = categories.filter(c => p.childIds.includes(c.id) || c.parent_id === p.id).map(c => {
        let display = c.name;
        if (display.includes(' - ')) display = display.split(' - ')[1];
        return { ...c, displayName: display };
      });
      return { ...p, children };
    });
  }, [categories]);

  const toggleGroup = (slug) => {
    setOpenGroups(prev => ({ ...prev, [slug]: !prev[slug] }));
  };

  const filteredProducts = products.filter(p => {
    if (selectedCategory && p.categories?.slug !== selectedCategory && 
        !groupedCategories.find(g => g.slug === selectedCategory)?.children.some(ch => ch.slug === p.categories?.slug)) {
      // Si se selecciona padre, mostrar hijos
      const parent = groupedCategories.find(g => g.slug === selectedCategory);
      if (parent) {
        if (!parent.children.some(ch => ch.slug === p.categories?.slug)) return false;
      } else if (p.categories?.slug !== selectedCategory) {
        return false;
      }
    }
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (minPrice && p.price < parseInt(minPrice)) return false;
    if (maxPrice && p.price > parseInt(maxPrice)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filtros - MENU AGRUPADO QUE PEDISTE */}
        <div className="lg:col-span-1">
          <div className="space-y-6 sticky top-4">
            <div>
              <label className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-2 block">Buscar</label>
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-black px-3 py-2.5 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-3 block">Categorías</label>
              <div className="border border-black">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-4 py-3 text-sm border-b border-neutral-200 hover:bg-neutral-50 ${!selectedCategory ? 'font-bold bg-black text-white' : ''}`}
                >
                  Todas las categorías
                </button>

                {groupedCategories.map((group) => (
                  <div key={group.slug} className="border-b border-neutral-200 last:border-b-0">
                    <button
                      onClick={() => toggleGroup(group.slug)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-neutral-50"
                    >
                      <span className="font-semibold">{group.name}</span>
                      <span className={`text-[10px] transition-transform ${openGroups[group.slug] ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    
                    {openGroups[group.slug] && (
                      <div className="bg-neutral-50 border-t border-neutral-100">
                        <button
                          onClick={() => setSelectedCategory(group.slug)}
                          className={`w-full text-left pl-4 pr-4 py-2 text-[13px] hover:bg-white ${selectedCategory === group.slug ? 'font-bold bg-white' : 'text-neutral-600'}`}
                        >
                          Ver todo {group.name}
                        </button>
                        {group.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => setSelectedCategory(child.slug)}
                            className={`w-full text-left pl-8 pr-4 py-2.5 text-[13px] hover:bg-white flex items-center gap-2 ${selectedCategory === child.slug ? 'font-bold bg-white text-black' : 'text-neutral-600'}`}
                          >
                            <span>—</span> {child.displayName}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-3 block">Precio</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Mín $"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="flex-1 border border-neutral-300 px-3 py-2.5 text-sm focus:border-black focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Máx $"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="flex-1 border border-neutral-300 px-3 py-2.5 text-sm focus:border-black focus:outline-none"
                />
              </div>
              <p className="text-[10px] text-neutral-500 mt-1">Filtrar por rango de precio</p>
            </div>

            <button
              onClick={() => { setSelectedCategory(''); setSearchQuery(''); setMinPrice(''); setMaxPrice(''); }}
              className="text-xs underline"
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        {/* Grilla Productos */}
        <div className="lg:col-span-3">
          <div className="mb-4 text-sm text-neutral-600">
            {filteredProducts.length} productos
            {selectedCategory && ` en ${categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}`}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

