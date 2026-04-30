import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { VaultProvider } from './context/VaultContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <VaultProvider>
        <App />
      </VaultProvider>
    </BrowserRouter>
  </StrictMode>,
)
