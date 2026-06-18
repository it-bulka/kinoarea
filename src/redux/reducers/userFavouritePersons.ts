import { IFbFavouritePerson } from '../../api/types/person'
import { UserFavouritePersonsActions } from '../actions/userFavouritePersons'
import { UserFavouritePersons } from '../actionsTypes/userFavouritePersons'

interface IInitialState {
  persons: IFbFavouritePerson[]
  loading: boolean
  error: string | null
}

const initialState: IInitialState = {
  persons: [],
  loading: false,
  error: null,
}

export const userFavouritePersonsReducer = (
  state = initialState,
  action: UserFavouritePersonsActions
): IInitialState => {
  switch (action.type) {
    case UserFavouritePersons.ADD:
      return { ...state, persons: action.payload, loading: false, error: null }
    case UserFavouritePersons.LOAD:
      return { ...state, loading: true }
    case UserFavouritePersons.ERR:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
