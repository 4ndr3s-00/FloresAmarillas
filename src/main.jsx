import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminPage from './components/AdminPage.jsx'

const isAdmin = window.location.pathname.startsWith('/admin')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdmin ? <AdminPage /> : <App />}
  </StrictMode>,
)