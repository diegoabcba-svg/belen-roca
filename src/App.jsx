import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import Cart from './pages/Cart'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/joyeria" element={<Catalog />} />
        <Route path="/productos" element={<Catalog />} />
        <Route path="/producto/:slug" element={<Product />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="*" element={<p className="p-16 text-center">Página no encontrada</p>} />
      </Route>
    </Routes>
  )
}
