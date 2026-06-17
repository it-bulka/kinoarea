import { IFbFavouriteMovie } from '../../api/types/film'
import { CustomError } from '../../api/types/responses'
import { UserFavouriteFilms } from '../actionsTypes/userFavouriteFilms'

export interface AddUserFavouriteFilms {
  type: UserFavouriteFilms.ADD
  payload: IFbFavouriteMovie[]
}

export interface LoadUserFavouriteFilms {
  type: UserFavouriteFilms.LOAD
}

export interface ErrUserFavouriteFilms {
  type: UserFavouriteFilms.ERR
  payload: CustomError
}

export interface RemoveUserFavouriteFilm {
  type: UserFavouriteFilms.REMOVE
  payload: number
}

export type UserFavouriteFilmsActions =
  | AddUserFavouriteFilms
  | LoadUserFavouriteFilms
  | ErrUserFavouriteFilms
  | RemoveUserFavouriteFilm
