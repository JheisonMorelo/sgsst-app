import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Restaurar ruta guardada por 404.html (workaround SPA routing en Render)
const redirect = sessionStorage.getItem('spa_redirect');
if (redirect && redirect !== '/') {
  sessionStorage.removeItem('spa_redirect');
  window.history.replaceState(null, '', redirect);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
