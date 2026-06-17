import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

interface SpinnerProps {
  className?: string
}

export const Spinner = memo(({ className }: SpinnerProps) => (
  <svg className={twMerge('animate-spin', className)} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
))

Spinner.displayName = 'Spinner'
