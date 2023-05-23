import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TotalRegistersContextProvider } from './context/provider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TotalRegistersContextProvider>
    <App />
  </TotalRegistersContextProvider>,
)
