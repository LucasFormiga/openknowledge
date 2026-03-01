import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@lucasformiga/openknowledge-react/dist/index.css'
import App from './App.tsx'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
