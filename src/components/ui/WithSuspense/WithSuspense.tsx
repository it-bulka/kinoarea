import { ReactNode, Suspense } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

export const WithSuspense = ({ children, fallback = null }: Props) => (
  <Suspense fallback={fallback}>{children}</Suspense>
)
