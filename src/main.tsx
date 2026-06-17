import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import './i18n'
import './styles/index.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ReduxProvider } from './redux'
import { GlobalErrorFallback } from './components/ui/ErrorFallback'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={GlobalErrorFallback} onReset={() => window.location.reload()}>
      <ReduxProvider>
        <RouterProvider router={router} />
      </ReduxProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
