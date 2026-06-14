import * as MovieAsyncActions from './moviesAsyncActions'
import * as GenresAsyncActions from './genres'
import * as PersonsThunk from './persons'
import * as ProfitAsyncActions from './profit'
import {
  MoviesActionCreators,
  PersonsActionCreator,
  ProfitActionCreators,
  AuthFormActionCreators,
  NotificationCreators,
} from '../actionsCreators'
import { fetchUser, updateUser, createUser, removeFetchedUser, getLoggedUser } from './user'
import { fetchUserReviews, setUserReview } from './userReviews'
import { fetchUserFriends, addUserFriend, removeUserFriend } from './userFriends'
import { fetchIncomingFriends, removeIncomingFriend, addIncomingFriend } from './incomingFriends'
import { fetchUserFavouriteFilms } from './userFavouriteFilms'
import { fetchUserFavouritePersons } from './userFavouritePersons'
import { setLanguage } from '../actionsCreators/language'

export default {
  ...MovieAsyncActions,
  ...GenresAsyncActions,
  ...PersonsThunk,
  ...ProfitAsyncActions,
  changePersonActiveCategory: PersonsActionCreator.changeActiveCategory,
  ...MoviesActionCreators,
  ...ProfitActionCreators,
  ...AuthFormActionCreators,
  ...NotificationCreators,
  fetchUser,
  updateUser,
  fetchUserReviews,
  setUserReview,
  fetchUserFriends,
  createUser,
  removeFetchedUser,
  getLoggedUser,
  addUserFriend,
  removeUserFriend,
  removeIncomingFriend,
  fetchIncomingFriends,
  addIncomingFriend,
  fetchUserFavouriteFilms,
  fetchUserFavouritePersons,
  setLanguage,
}
