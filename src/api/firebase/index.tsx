export { COLLECTIONS, getCollectionRef, getDocsInfo, getDocsInfoWithCol } from './helpers'

import {
  getUser,
  createUser,
  refreshUser,
  getUserFriends,
  addUserFriend,
  removeUserFriend,
  addIncomingFriend,
  removeIncomingFriend,
} from './users'
import { getUserReviews, getUserReviewsPaginated, getMovieReviews, setUserReview, deleteUserReview } from './reviews'
import { addFavouriteFilm, removeFavouriteFilm, getFavouriteFilms, getFavouriteFilm, toggleFilmStatus } from './films'
import { addFavouritePerson, removeFavouritePerson, getFavouritePersons } from './persons'
import { getNews, getNewsItem, addSubscription, trackDeletedImage, uploadProfileImg } from './services'

export const FirebaseApi = {
  getUser,
  createUser,
  refreshUser,
  getUserFriends,
  addUserFriend,
  removeUserFriend,
  addIncomingFriend,
  removeIncomingFriend,
  getUserReviews,
  getUserReviewsPaginated,
  getMovieReviews,
  setUserReview,
  deleteUserReview,
  addFavouriteFilm,
  removeFavouriteFilm,
  getFavouriteFilms,
  getFavouriteFilm,
  toggleFilmStatus,
  addFavouritePerson,
  removeFavouritePerson,
  getFavouritePersons,
  getNews,
  getNewsItem,
  addSubscription,
  trackDeletedImage,
  uploadProfileImg,
}
