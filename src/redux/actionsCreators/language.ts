import { type Dispatch } from 'redux'
import { LanguageCode, LanguageEnum } from '../actionsTypes/language'
import i18n from '../../i18n'

const LANGUAGE_KEY = 'kinoarea_language'

export const setLanguage = (lang: LanguageCode) => (dispatch: Dispatch) => {
  localStorage.setItem(LANGUAGE_KEY, lang)
  i18n.changeLanguage(lang === 'en-US' ? 'en' : 'uk')
  dispatch({ type: LanguageEnum.SET_LANGUAGE, payload: lang })
}

export const getStoredLanguage = (): LanguageCode => {
  return (localStorage.getItem(LANGUAGE_KEY) as LanguageCode) || 'uk-UA'
}
