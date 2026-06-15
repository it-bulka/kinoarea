import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import './styles/index.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ReduxProvider } from './redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
)
