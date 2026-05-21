import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Suppress noisy errors injected by browser extensions (e.g. syntax `export` in extension scripts)
// This prevents extension-origin errors from surfacing to the app console or crashing runtime code.
window.addEventListener('error', (e) => {
  try {
    if (e && e.filename && e.filename.startsWith('chrome-extension://')) {
      e.preventDefault()
      return true
    }
  } catch (err) {
    // ignore
  }
})

window.addEventListener('unhandledrejection', (ev) => {
  try {
    const reason = ev && ev.reason
    const stack = (reason && (reason.stack || reason)) || ''
    if (typeof stack === 'string' && stack.includes('chrome-extension://')) {
      ev.preventDefault()
      return true
    }
  } catch (err) {
    // ignore
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
