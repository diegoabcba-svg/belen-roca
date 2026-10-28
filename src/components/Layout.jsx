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
          <Link to="/"><img src={site.logo} alt={site.name} className="h-12 md:h-14 w-auto" /></Link>
          
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
        
        {open && <div className="border-t border-white/20 px-4 pb-4 lg:hidden max-h- overflow-y-auto">
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
        <p className="mt-3 space-x-4">
          {site.instagram && <a href={site.instagram} className="hover:text-primary">Instagram</a>} 
          {site.facebook && <a href={site.facebook} className="hover:text-primary">Facebook</a>} 
          {site.email && <a href={`mailto:${site.email}`} className="hover:text-primary">Email</a>}
          {site.whatsapp && <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">WhatsApp</a>}
        </p>
      </footer>

      {site.whatsapp && (
        <a
          href={`https://wa.me/${site.whatsapp}?text=Hola%20${encodeURIComponent(site.name)}%20quiero%20consultar%20por%20`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#20bd5a]"
          aria-label="WhatsApp"[STRIPPED 34 bytes]"0 0 24 24" className="h-7 w-7 fill-white"><path d="M19.05 4.93A9.9 9.9 0 0 0 12.03 2C6.52 2 2.05 6.47 2.05 11.98c0 1.76.46 3.48 1.33 4.99L2 22l5.18-1.36a9.93 9.93 0 0 0 4.85 1.23h.01c5.51 0 9.98-4.47 9.98-9.98a9.88 9.88 0 0 0-2.97-7.06Zm-7.02 15.2h-.01a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.07.81.82-2.99-.2-.31A8.17 8.17 0 0 1 3.86 12c0-4.5 3.66-8.16 8.17-8.16 2.18 0 4.23.85 5.77 2.39a8.1 8.1 0 0 1 2.39 5.77c0 4.5-3.66 8.13-8.12 8.13Zm4.48-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.08-.4-.12-.57.12s-.65.8-.8.97-.3.19-.55.06c-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.3-.02-.43-.06-.12-.57-1.38-.78-1.89-.21-.5-.42-.43-.57-.44l-.49-.01c-.17 0-.43.06-.66.3-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.12.16 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28Z"/></svg>
        </a>
      )}
    </>
  )
}
  
