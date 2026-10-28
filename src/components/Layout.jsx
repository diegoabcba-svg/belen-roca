import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { site } from '../config/site'
import { useCart } from '../hooks/useCart'

export default function Layout() {
  const [open, setOpen] = useState(false), { count } = useCart(), nav = useNavigate()
  const search = e => { e.preventDefault(); const q = new FormData(e.target).get('q'); setOpen(false); nav(`/catalogo?q=${encodeURIComponent(q)}`) }
  
  return (
    <>
      <header className="sticky top-0 z-30 bg-ink text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2">
          <button className="text-2xl lg:hidden" aria-label="Menú" onClick={() => setOpen(!open)}>☰</button>
          <Link to="/"><img src={site.logo} alt={site.name} className="h-12" /></Link>
          
          <nav className="ml-4 hidden gap-4 text-xs tracking-widest lg:flex">
            {site.nav.map(n => (
              <div key={n.label} className="group relative py-2">
                <NavLink to={n.to} className="hover:text-primary">{n.label}</NavLink>
                {n.subItems && (
                  <div className="absolute left-0 top-full hidden w-48 flex-col bg-ink border border-white/20 p-2 group-hover:flex">
                    {n.subItems.map(sub => (
                      <NavLink key={sub.label} to={sub.to} className="py-2 hover:text-primary">{sub.label}</NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          <form onSubmit={search} className="ml-auto hidden md:block"><input name="q" placeholder="Buscar..." className="w-48 border-b border-white/40 bg-transparent px-1 py-1 text-sm outline-none" /></form>
          <Link to="/carrito" className="ml-auto md:ml-3 relative min-h-11 px-2 py-2 text-sm">🛒 <span className="rounded-full bg-primary px-2 text-xs">{count}</span></Link>
        </div>
        
        {open && <div className="border-t border-white/20 px-4 pb-4 lg:hidden max-h-[80vh] overflow-y-auto">
          <form onSubmit={search} className="py-3"><input name="q" placeholder="Buscar producto..." className="w-full border-b border-white/40 bg-transparent py-2 outline-none" /></form>
          {site.nav.map(n => (
            <div key={n.label}>
              <Link to={n.to} onClick={() => setOpen(false)} className="block py-3 text-sm tracking-widest text-primary font-bold">{n.label}</Link>
              {n.subItems && (
                <div className="pl-4 pb-2 border-b border-white/10 mb-2">
                  {n.subItems.map(sub => (
                    <Link key={sub.label} to={sub.to} onClick={() => setOpen(false)} className="block py-2 text-sm tracking-widest text-white/80">{sub.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>}
      </header>
      <main><Outlet /></main>
      <footer className="mt-16 bg-ink px-4 py-10 text-center text-sm text-white">
        <p className="font-display text-2xl">{site.name}</p><p className="text-white/60">{site.tagline}</p>
        <p className="mt-3 space-x-4">{site.instagram && <a href={site.instagram}>Instagram</a>} {site.facebook && <a href={site.facebook}>Facebook</a>} {site.email && <a href={`mailto:${site.email}`}>Email</a>}</p>
      </footer>
    </>
  )
}