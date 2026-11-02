import { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
// Fix import - tu cliente supabase está en una de estas rutas:
import { supabase } from '../lib/supabase';
// Si arriba falla, probá estas alternativas (descomentá la correcta):
// import { supabase } from '../config/supabase';
// import { supabase } from '../supabase/client';
// import { supabase } from '../lib/supabaseClient';
// import supabase from '../lib/supabaseClient';
// import { supabase } from '../../supabase/client';

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
