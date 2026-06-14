import { LanguageCode, LanguageEnum } from '../actionsTypes/language'

export interface SetLanguageAction {
  type: LanguageEnum.SET_LANGUAGE
  payload: LanguageCode
}

export type LanguageActions = SetLanguageAction
