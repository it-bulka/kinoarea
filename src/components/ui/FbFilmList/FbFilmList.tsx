import { memo } from 'react'
import { Film } from '../Film/Film'
import { IFbFavouriteMovie } from '../../../api/types/film'
import { BaseMovieDBAssetsUrl } from '../../../api'

interface FbFilmListProps {
  list: IFbFavouriteMovie[]
}

export const FbFilmList = memo(({ list }: FbFilmListProps) => {
  return (
    <div className={'grid gap-3 grid-cols-card-2 md:gap-3.5 md:grid-cols-card-3 lg:grid-cols-card-4 2xl:gap-[22px]'}>
      {list.map(film => (
        <Film
          key={film.id}
          id={film.id}
          img={film.poster_path ? `${BaseMovieDBAssetsUrl}${film.poster_path}` : null}
          title={film.name || film.original_name || ''}
          rating={0}
          genre={''}
        />
      ))}
    </div>
  )
})

FbFilmList.displayName = 'FbFilmList'
