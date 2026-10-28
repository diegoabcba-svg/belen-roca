import { site } from '../config/site'
export const money = n => new Intl.NumberFormat(site.locale, { style: 'currency', currency: site.currency, maximumFractionDigits: 0 }).format(n)
export const waLink = t => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t)}`
export const images = p => [...(p.product_images || [])].sort((a, b) => a.sort_order - b.sort_order).map(i => i.image_url)
export const discount = p => p.compare_price > p.price ? Math.round(100 - (p.price * 100) / p.compare_price) : 0
export const productMsg = (p, q) => `Hola, quiero realizar una consulta/compra:\n\nProducto: ${p.name}\nCantidad: ${q}\nPrecio: ${money(p.price)}\n\nTotal: ${money(p.price * q)}`
export const cartMsg = items => 'Hola, quiero realizar una consulta/compra:\n\n' + items.map(i => `Producto: ${i.name}\nCantidad: ${i.qty}\nPrecio: ${money(i.price)}\n`).join('\n') + `\nTotal: ${money(items.reduce((s, i) => s + i.price * i.qty, 0))}`
