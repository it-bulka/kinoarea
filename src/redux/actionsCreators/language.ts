import { type Dispatch } from 'redux'
import { LanguageCode, LanguageEnum } from '../actionsTypes/language'

const LANGUAGE_KEY = 'kinoarea_language'

export const setLanguage = (lang: LanguageCode) => (dispatch: Dispatch) => {
  localStorage.setItem(LANGUAGE_KEY, lang)
  dispatch({ type: LanguageEnum.SET_LANGUAGE, payload: lang })
}

export const getStoredLanguage = (): LanguageCode => {
  return (localStorage.getItem(LANGUAGE_KEY) as LanguageCode) || 'uk-UA'
}
