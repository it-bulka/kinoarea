import type { Dispatch } from 'redux'
import { UserFavouritePersonsActions } from '../actions/userFavouritePersons'
import { UserFavouritePersonsActionCreators } from '../actionsCreators/userFavouritePersons'
import { FirebaseApi } from '../../api/firebase'

export const fetchUserFavouritePersons = (userId: string) => {
  return async (dispatch: Dispatch<UserFavouritePersonsActions>) => {
    try {
      dispatch(UserFavouritePersonsActionCreators.load())
      const persons = await FirebaseApi.getFavouritePersons({ userId })
      dispatch(UserFavouritePersonsActionCreators.add(persons))
    } catch (err) {
      let message = 'Smth went wrong'
      if (err instanceof Error) message = err.message
      dispatch(UserFavouritePersonsActionCreators.err(message))
    }
  }
}
