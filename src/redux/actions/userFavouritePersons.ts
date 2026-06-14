import { IFbFavouritePerson } from '../../api/types/person'
import { CustomError } from '../../api/types/responses'
import { UserFavouritePersons } from '../actionsTypes/userFavouritePersons'

export interface AddUserFavouritePersons {
  type: UserFavouritePersons.ADD
  payload: IFbFavouritePerson[]
}

export interface LoadUserFavouritePersons {
  type: UserFavouritePersons.LOAD
}

export interface ErrUserFavouritePersons {
  type: UserFavouritePersons.ERR
  payload: CustomError
}

export type UserFavouritePersonsActions = AddUserFavouritePersons | LoadUserFavouritePersons | ErrUserFavouritePersons
