import { memo, useCallback } from 'react'
import { IFbFavouriteMovie, IFilmStatus } from '../../../api/types/film'
import { FbFilmCard } from '../FbFilmCard/FbFilmCard'
import { useActions } from '../../../hooks/useActions'

interface FbFilmListProps {
  list: IFbFavouriteMovie[]
  statuses: IFilmStatus[]
}

export const FbFilmList = memo(({ list, statuses }: FbFilmListProps) => {
  const { removeUserFavouriteFilm } = useActions()

  const handleRemove = useCallback(
    (filmId: number) => {
      removeUserFavouriteFilm(filmId)
    },
    [removeUserFavouriteFilm]
  )

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-2.5 md:gap-3 lg:gap-4">
      {list.map(film => (
        <FbFilmCard key={film.id} film={film} statuses={statuses} onRemove={handleRemove} />
      ))}
    </div>
  )
})

FbFilmList.displayName = 'FbFilmList'
