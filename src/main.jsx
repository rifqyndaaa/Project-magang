import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Dimuat terakhir agar lapisan penyempurnaan premium menimpa CSS halaman.
import './styles/premium.css'
// Lapisan panel admin dimuat SETELAH premium.css agar aturannya pasti menang.
import './styles/admin.css'
// Lapisan aksesibilitas dimuat PALING AKHIR: fokus, kontras, target sentuh.
import './styles/a11y.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
