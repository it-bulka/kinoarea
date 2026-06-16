import { Film } from '../Film/Film'
import { IMovies } from '../../../api/types'
import { getGenres } from '../../../utils/getGenres'
import { memo } from 'react'
import type { GenreIds } from '../../../mock/types'
const baseUrl = import.meta.env.VITE_MOVIEDB_ASSETS

interface FilmListProps {
  list: IMovies
}

export const FilmList = memo(({ list }: FilmListProps) => {
  return (
    <div
      className={
        'grid gap-3 grid-cols-card-2 md:gap-3.5 md:grid-cols-card-3 lg:grid-cols-card-4 xl:grid-cols-5 2xl:gap-[22px]'
      }
    >
      {list.map(movie => {
        const genre = getGenres(movie.genre_ids as unknown as GenreIds)

        return (
          <Film
            img={`${baseUrl}${movie.poster_path}`}
            rating={movie.vote_average}
            title={movie.title || movie.name || ''}
            genre={genre || ''}
            id={movie.id}
            key={movie.id}
          />
        )
      })}
    </div>
  )
})

FilmList.displayName = 'FilmList'
