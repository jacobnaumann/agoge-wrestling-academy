import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'
import { ContentProvider } from './data/ContentContext.jsx'

// Lightweight routing: /admin renders the content editor, everything else the
// public site. nginx's SPA fallback (try_files ... /index.html) serves both.
const isAdmin = window.location.pathname.replace(/\/+$/, '') === '/admin'

if (isAdmin) {
  // Keep the admin page out of search results.
  const meta = document.createElement('meta')
  meta.name = 'robots'
  meta.content = 'noindex, nofollow'
  document.head.appendChild(meta)
  document.title = 'Admin — Agoge Wrestling Academy'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdmin ? (
      <AdminApp />
    ) : (
      <ContentProvider>
        <App />
      </ContentProvider>
    )}
  </StrictMode>,
)
