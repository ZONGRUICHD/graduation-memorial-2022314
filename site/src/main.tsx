import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root')!
const mountApp = () => {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

// Let the pre-rendered hero reach the compositor before React replaces it.
// This keeps the first meaningful photograph independent of JavaScript startup.
window.requestAnimationFrame(() => window.requestAnimationFrame(mountApp))
