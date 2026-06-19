import { memo } from 'react'
import type { LanguageCode } from '@/redux/actionsTypes/language'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useActions } from '../../../hooks/useActions'
import { useTranslation } from 'react-i18next'

export const LanguageToggler = memo(() => {
  const currentLanguage = useTypedSelector(state => state.language.current)
  const { setLanguage } = useActions()
  const { t } = useTranslation()

  const handleLanguageToggle = () => {
    const next: LanguageCode = currentLanguage === 'uk-UA' ? 'en-US' : 'uk-UA'
    setLanguage(next)
  }

  return (
    <button
      onClick={handleLanguageToggle}
      className="text-xs font-inter font-semibold text-text-muted hover:text-gold transition-colors px-1"
      title={t('header.switchToEn')}
    >
      {currentLanguage === 'uk-UA' ? 'UA' : 'EN'}
    </button>
  )
})

LanguageToggler.displayName = 'LanguageToggler'
