import { IFbFavouriteMovie } from '../../api/types/film'
import {
  AddUserFavouriteFilms,
  ErrUserFavouriteFilms,
  LoadUserFavouriteFilms,
  RemoveUserFavouriteFilm,
} from '../actions/userFavouriteFilms'
import { UserFavouriteFilms } from '../actionsTypes/userFavouriteFilms'

export const UserFavouriteFilmsActionCreators = {
  add: (films: IFbFavouriteMovie[]): AddUserFavouriteFilms => ({
    type: UserFavouriteFilms.ADD,
    payload: films,
  }),
  load: (): LoadUserFavouriteFilms => ({
    type: UserFavouriteFilms.LOAD,
  }),
  err: (err: string): ErrUserFavouriteFilms => ({
    type: UserFavouriteFilms.ERR,
    payload: err,
  }),
  removeFilm: (filmId: number): RemoveUserFavouriteFilm => ({
    type: UserFavouriteFilms.REMOVE,
    payload: filmId,
  }),
}
