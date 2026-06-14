import { IFbFavouritePerson } from '../../api/types/person'
import {
  AddUserFavouritePersons,
  ErrUserFavouritePersons,
  LoadUserFavouritePersons,
} from '../actions/userFavouritePersons'
import { UserFavouritePersons } from '../actionsTypes/userFavouritePersons'

export const UserFavouritePersonsActionCreators = {
  add: (persons: IFbFavouritePerson[]): AddUserFavouritePersons => ({
    type: UserFavouritePersons.ADD,
    payload: persons,
  }),
  load: (): LoadUserFavouritePersons => ({
    type: UserFavouritePersons.LOAD,
  }),
  err: (err: string): ErrUserFavouritePersons => ({
    type: UserFavouritePersons.ERR,
    payload: err,
  }),
}
