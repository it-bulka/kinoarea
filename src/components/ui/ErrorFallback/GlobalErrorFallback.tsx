import type { FallbackProps } from 'react-error-boundary'
import i18n from '../../../i18n'

export const GlobalErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const t = (key: string) => i18n.t(key)
  const errorObj = error instanceof Error ? error : null

  return (
    <div className="min-h-screen bg-noir flex items-center justify-center flex-col px-4 text-center">
      <h1 className="text-4xl font-playfair font-bold text-text-base mb-4 md:text-50/[80px]">
        {t('error.globalTitle')}
      </h1>
      <p className="text-15 font-inter text-text-muted mb-8 max-w-md">{t('error.globalMessage')}</p>
      {import.meta.env.DEV && errorObj && (
        <pre className="text-xs text-red-400 bg-noir-card rounded-10 p-4 mb-6 max-w-lg overflow-auto text-left">
          {errorObj.message}
          {'\n'}
          {errorObj.stack}
        </pre>
      )}
      <button
        onClick={resetErrorBoundary}
        className="rounded-md px-8 py-3 bg-gold text-noir font-inter font-medium hover:opacity-80 transition-opacity duration-200"
      >
        {t('error.reload')}
      </button>
    </div>
  )
}
