import { MovieActions } from '../actions/moviesActions'
import { MoviesActionTypes } from '../actionsTypes/moviesActionTypes'
import type { IMovies } from '../../api/types'
import { ICategory } from '../../components/ui/Category/Category'
import { genres, years } from '../../mock/categories'
interface IMoviesState {
  isNowPlayingLoading: boolean
  nowPlayingError: null | string
  nowPlaying: IMovies
  nowPlayingCategory: ICategory

  isPopularLoading: boolean
  popularError: null | string
  popular: IMovies
  popularCategory: ICategory

  isUpcomingLoading: boolean
  upcomingError: null | string
  upcoming: IMovies
}

const initial: IMoviesState = {
  isNowPlayingLoading: true,
  nowPlayingError: null,
  nowPlaying: [],
  nowPlayingCategory: genres[0],

  isPopularLoading: true,
  popularError: null,
  popular: [],
  popularCategory: years[0],

  isUpcomingLoading: true,
  upcomingError: null,
  upcoming: [],
}

export const moviesReducer = (state: IMoviesState = initial, action: MovieActions): IMoviesState => {
  switch (action.type) {
    case MoviesActionTypes.ADD_NOW_PLAYING_MOVIE:
      return { ...state, nowPlaying: action.payload, isNowPlayingLoading: false, nowPlayingError: null }
    case MoviesActionTypes.LOAD_NOW_PLAYING_MOVIE:
      return { ...state, isNowPlayingLoading: true, nowPlayingError: null }
    case MoviesActionTypes.ERROR_NOW_PLAYING_MOVIE:
      return { ...state, isNowPlayingLoading: false, nowPlayingError: action.payload }
    case MoviesActionTypes.CHANGE_NOW_PLAYING_CATEGORY:
      return { ...state, nowPlayingCategory: action.payload }

    case MoviesActionTypes.ADD_POPULAR_MOVIE:
      return { ...state, popular: action.payload, isPopularLoading: false, popularError: null }
    case MoviesActionTypes.LOAD_POPULAR_MOVIE:
      return { ...state, isPopularLoading: true, popularError: null }
    case MoviesActionTypes.ERROR_POPULAR_MOVIE:
      return { ...state, isPopularLoading: false, popularError: action.payload }
    case MoviesActionTypes.CHANGE_POPULAR_CATEGORY:
      return { ...state, popularCategory: action.payload }

    case MoviesActionTypes.ADD_UPCOMING_MOVIE:
      return { ...state, upcoming: action.payload, isUpcomingLoading: false, upcomingError: null }
    case MoviesActionTypes.LOAD_UPCOMING_MOVIE:
      return { ...state, isUpcomingLoading: true, upcomingError: null }
    case MoviesActionTypes.ERROR_UPCOMING_MOVIE:
      return { ...state, isUpcomingLoading: false, upcomingError: action.payload }
    default:
      return state
  }
}
