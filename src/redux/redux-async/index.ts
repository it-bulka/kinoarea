import * as MovieAsyncActions from './moviesAsyncActions'
import * as GenresAsyncActions from './genres'
import * as PersonsThunk from './persons'
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

export default {
  ...MovieAsyncActions,
  ...GenresAsyncActions,
  ...PersonsThunk,
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
}
