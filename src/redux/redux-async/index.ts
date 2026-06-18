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
import { fetchUser, updateUser, createUser, removeFetchedUser, getLoggedUser, signInWithGoogle } from './user'
import { fetchUserReviews, setUserReview } from './userReviews'
import { fetchUserFriends, addUserFriend, removeUserFriend } from './userFriends'
import { fetchIncomingFriends, removeIncomingFriend, addIncomingFriend } from './incomingFriends'
import { fetchUserFavouriteFilms } from './userFavouriteFilms'
import { UserFavouriteFilmsActionCreators } from '../actionsCreators/userFavouriteFilms'
import { fetchUserFavouritePersons } from './userFavouritePersons'
import { setLanguage } from '../actionsCreators/language'
import * as HeroSliderAsyncActions from './heroSlider'

export default {
  ...HeroSliderAsyncActions,
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
  signInWithGoogle,
  addUserFriend,
  removeUserFriend,
  removeIncomingFriend,
  fetchIncomingFriends,
  addIncomingFriend,
  fetchUserFavouriteFilms,
  removeUserFavouriteFilm: UserFavouriteFilmsActionCreators.removeFilm,
  fetchUserFavouritePersons,
  setLanguage,
}
