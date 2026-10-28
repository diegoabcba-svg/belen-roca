import { supabase } from '../lib/supabase'
import { sampleCategories, sampleProducts } from '../data/sample'
let cache
export async function getCatalog() {
  if (cache) return cache
  if (!supabase) return (cache = { products: sampleProducts, categories: sampleCategories })
  const [p, c] = await Promise.all([
    supabase.from('products').select('*, product_images(image_url, sort_order), categories(name, slug)').eq('active', true).order('created_at', { ascending: false }),
    supabase.from('categories').select('*').eq('active', true).order('name'),
  ])
  if (p.error || c.error) return { products: sampleProducts, categories: sampleCategories }
  return (cache = { products: p.data, categories: c.data })
}
