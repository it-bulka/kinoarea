import { LanguageActions } from '../actions/language'
import { LanguageCode, LanguageEnum } from '../actionsTypes/language'
import { getStoredLanguage } from '../actionsCreators/language'

interface LanguageState {
  current: LanguageCode
}

const initialState: LanguageState = {
  current: getStoredLanguage(),
}

export const languageReducer = (state = initialState, action: LanguageActions): LanguageState => {
  switch (action.type) {
    case LanguageEnum.SET_LANGUAGE:
      return { current: action.payload }
    default:
      return state
  }
}
