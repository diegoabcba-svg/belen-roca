import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CartProvider } from './hooks/useCart'
import { site } from './config/site'
import './styles/index.css'
Object.entries({ ...site.colors, ...site.fonts, ...site.radius }).forEach(([k, v]) => document.documentElement.style.setProperty(k, v))
createRoot(document.getElementById('root')).render(<BrowserRouter><CartProvider><App /></CartProvider></BrowserRouter>)
