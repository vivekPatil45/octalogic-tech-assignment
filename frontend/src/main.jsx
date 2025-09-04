import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProviderWrapper } from './components/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProviderWrapper>
      <App />
  </ThemeProviderWrapper>,

)
