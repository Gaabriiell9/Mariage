import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LanguageProvider } from './context/LanguageContext'
import { RSVPProvider } from './context/RSVPContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <RSVPProvider>
        <App />
      </RSVPProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
