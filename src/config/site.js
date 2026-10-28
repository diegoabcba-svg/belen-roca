// ÚNICO lugar para cambiar marca, contacto, colores, banner y menú.
export const site = {
  name: 'BELÉN ROCA',
  tagline: 'Indumentaria y joyería',
  logo: '/logo.jpg',            // reemplazá public/logo.jpg
  whatsapp: '5493517964809',    // sin + ni espacios
  instagram: '', facebook: '', email: '',
  currency: 'ARS', locale: 'es-AR',
  hero: { image: '/hero.jpg', title: 'Descubrí tu próximo favorito', subtitle: 'Joyas para todos los días', cta: 'VER COLECCIÓN' },
  colors: { '--c-primary': '#e10600', '--c-ink': '#0a0a0a', '--c-bg': '#ffffff', '--c-soft': '#f4f4f4', '--c-muted': '#6b6b6b', '--c-btn': '#0a0a0a', '--c-btn-text': '#ffffff' },
  fonts: { '--f-display': "'Cormorant Garamond', serif", '--f-body': "'Inter', sans-serif" },
  radius: { '--r-card': '2px' },
  nav: [
    { label: 'INICIO', to: '/' },
    { 
      label: 'ROPA DE MARCA', 
      to: '/catalogo?cat=ropa-de-marca',
      subItems: [
        { label: 'Ropa nueva', to: '/catalogo?cat=ropa-de-marca-nueva' },
        { label: 'Moda circular', to: '/catalogo?cat=ropa-de-marca-moda-circular' }
      ]
    },
    { 
      label: 'ROPA GENÉRICA', 
      to: '/catalogo?cat=ropa-generica',
      subItems: [
        { label: 'Ropa nueva', to: '/catalogo?cat=ropa-generica-nueva' },
        { label: 'Moda circular', to: '/catalogo?cat=ropa-generica-moda-circular' }
      ]
    },
    { 
      label: 'JOYERÍA', 
      to: '/catalogo?cat=joyas',
      subItems: [
        { label: 'Plata 925', to: '/catalogo?cat=joyas-plata-925' },
        { label: 'Acero quirúrgico', to: '/catalogo?cat=joyas-acero-quirurgico' }
      ]
    },
    { label: 'OFERTAS', to: '/catalogo?sort=ofertas' }
  ],
}
