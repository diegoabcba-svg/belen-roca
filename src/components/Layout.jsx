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
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg"
          aria-label="WhatsApp"[STRIPPED 34 bytes]"0 0 24 24" className="h-7 w-7 fill-current">
            <path d="M19.1 4.9A9.9 9.9 0 0 0 12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4A9.9 9.9 0 0 0 12 22c5.5 0 10-4.5 10-10 0-2.7-1-5.1-2.9-7.1zM12 20.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 0 1 3.8 12C3.8 7.5 7.5 3.8 12 3.8c2.2 0 4.2.9 5.8 2.4A8.1 8.1 0 0 1 20.2 12c0 4.5-3.7 8.2-8.2 8.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.1-.3.2-.5.1-.3-.1-1.1-.4-2-1.2-.7-.7-1.2-1.5-1.4-1.7-.1-.3 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.1-.2.2-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4 0-.6.3-.2.2-.9.8-.9 2s.9 2.4 1 2.6c.1.2 1.8 2.7 4.2 3.8.6.3 1.1.4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3z"/>
          </svg>
        </a>
      )}
    </>
  )
}

  
