import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

// Configure Axios globally
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';
axios.defaults.withCredentials = true;

// Optimized initialization for immediate FCP
const initApp = () => {
  // Create root and render immediately
  const root = createRoot(document.getElementById('root'));
  
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
  
  // Remove loading indicator if it exists
  const loadingElement = document.getElementById('initial-loader');
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
  
  // Defer non-critical optimizations after FCP
  requestIdleCallback(() => {
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    fontLink.crossOrigin = 'anonymous';
    if (!document.querySelector(`link[href="${fontLink.href}"]`)) {
      document.head.appendChild(fontLink);
    }
  });
};

// Initialize app immediately without waiting for DOMContentLoaded
initApp();
