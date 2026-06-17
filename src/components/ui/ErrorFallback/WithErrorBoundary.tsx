import { ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { SectionErrorFallback } from './SectionErrorFallback'

interface WithErrorBoundaryProps {
  children: ReactNode
  className?: string
}

export const WithErrorBoundary = ({ children, className }: WithErrorBoundaryProps) => (
  <ErrorBoundary FallbackComponent={props => <SectionErrorFallback {...props} className={className} />}>
    {children}
  </ErrorBoundary>
)
