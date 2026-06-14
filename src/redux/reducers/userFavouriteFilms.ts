import { IFbFavouriteMovie } from '../../api/types/film'
import { UserFavouriteFilmsActions } from '../actions/userFavouriteFilms'
import { UserFavouriteFilms } from '../actionsTypes/userFavouriteFilms'

interface IInitialState {
  films: IFbFavouriteMovie[]
  loading: boolean
  error: string | null
}

const initialState: IInitialState = {
  films: [],
  loading: false,
  error: null,
}

export const userFavouriteFilmsReducer = (state = initialState, action: UserFavouriteFilmsActions): IInitialState => {
  switch (action.type) {
    case UserFavouriteFilms.ADD:
      return { ...state, films: action.payload, loading: false, error: null }
    case UserFavouriteFilms.LOAD:
      return { ...state, loading: false }
    case UserFavouriteFilms.ERR:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
