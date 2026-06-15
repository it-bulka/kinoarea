import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import uk from './locales/uk/translation.json'
import en from './locales/en/translation.json'

const stored = localStorage.getItem('kinoarea_language')
const lng = stored === 'en-US' ? 'en' : 'uk'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources: {
    uk: { translation: uk },
    en: { translation: en },
  },
  lng,
  fallbackLng: 'uk',
  interpolation: { escapeValue: false },
})

export default i18n
