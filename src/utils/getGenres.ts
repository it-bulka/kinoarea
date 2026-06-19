import { GenreIds, movieTypes } from '../mock/types'
import { getGenresOptions } from './getGenresOptions'

export const getGenres = (genres_ids: GenreIds): string => {
  return genres_ids?.map(genre => movieTypes[genre]).join(', ')
}

export const genresOptions = getGenresOptions()
