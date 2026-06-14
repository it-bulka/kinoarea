import type { Dispatch } from 'redux'
import { UserFavouriteFilmsActions } from '../actions/userFavouriteFilms'
import { UserFavouriteFilmsActionCreators } from '../actionsCreators/userFavouriteFilms'
import { FirebaseApi } from '../../api/firebase'
import { IFilmStatus } from '../../api/types/film'

export const fetchUserFavouriteFilms = (userId: string, filmStatus: IFilmStatus) => {
  return async (dispatch: Dispatch<UserFavouriteFilmsActions>) => {
    try {
      dispatch(UserFavouriteFilmsActionCreators.load())
      const films = await FirebaseApi.getFavouriteFilms({ userId, filmStatus })
      dispatch(UserFavouriteFilmsActionCreators.add(films))
    } catch (err) {
      let message = 'Smth went wrong'
      if (err instanceof Error) message = err.message
      dispatch(UserFavouriteFilmsActionCreators.err(message))
    }
  }
}
