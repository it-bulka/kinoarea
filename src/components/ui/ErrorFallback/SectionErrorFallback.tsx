import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

interface SectionErrorFallbackProps {
  error: unknown
  resetErrorBoundary: (...args: unknown[]) => void
  className?: string
}

export const SectionErrorFallback = ({ resetErrorBoundary, className }: SectionErrorFallbackProps) => {
  const { t } = useTranslation()

  return (
    <div className={twMerge('rounded-10 bg-noir-card border border-noir-border py-8 px-4 text-center', className)}>
      <p className="text-text-muted font-inter text-sm mb-3">{t('error.sectionTitle')}</p>
      <button
        onClick={resetErrorBoundary}
        className="text-gold font-inter text-sm hover:opacity-80 transition-opacity duration-200 underline"
      >
        {t('error.retry')}
      </button>
    </div>
  )
}
