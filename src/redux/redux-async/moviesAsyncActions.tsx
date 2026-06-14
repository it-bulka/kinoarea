import { type Dispatch } from 'redux'
import { MoviesActionCreators } from '../actionsCreators'
import { MovieActions } from '../actions/moviesActions'

import { getSearch } from '../../api/movieDBApi'

export const fetchNowPlayingMovies = (genresIds?: string) => {
  return async (dispatch: Dispatch<MovieActions>) => {
    try {
      dispatch(MoviesActionCreators.loadNowPlayingMovies())
      const params = genresIds ? { with_genres: genresIds } : undefined
      const data = await getSearch({ type: 'movie', category: 'now_playing', params })
      dispatch(MoviesActionCreators.addNowPlayingMovies(data.results))
    } catch (err) {
      let message = 'Smth went wrong'
      if (err instanceof Error) message = err.message

      dispatch(MoviesActionCreators.errorNowPlayingMovies(message))
    }
  }
}

export const fetchPopularMovies = (year?: number) => {
  return async (dispatch: Dispatch<MovieActions>) => {
    try {
      dispatch(MoviesActionCreators.loadPopularMovies())

      const params = year ? { year } : undefined
      const data = await getSearch({ type: 'movie', category: 'popular', params })
      dispatch(MoviesActionCreators.addPopularMovies(data.results))
    } catch (err) {
      let message = 'Smth went wrong'
      if (err instanceof Error) message = err.message

      dispatch(MoviesActionCreators.errorPopularMovies(message))
    }
  }
}

export const fetchUpcomingMovies = () => {
  return async (dispatch: Dispatch<MovieActions>) => {
    try {
      dispatch(MoviesActionCreators.loadUpcomingMovies())
      const data = await getSearch({ type: 'movie', category: 'upcoming' })
      dispatch(MoviesActionCreators.addUpcomingMovies(data.results))
    } catch (err) {
      let message = 'Smth went wrong'
      if (err instanceof Error) message = err.message

      dispatch(MoviesActionCreators.errorUpcomingMovies(message))
    }
  }
}
