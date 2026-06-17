import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { IFbFavouriteMovie, IFilmStatus } from '../../../api/types/film'
import { BaseMovieDBAssetsUrl } from '../../../api'
import { IconBtn } from '../IconBtn/IconBtn'
import { AbsentImg } from '../AbsentImg/AbsentImg'
import { FirebaseApi } from '../../../api/firebase'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

interface FbFilmCardProps {
  film: IFbFavouriteMovie
  statuses: IFilmStatus[]
  onRemove: (filmId: number) => void
}

const statusToIcon = {
  favourite: 'heart',
  liked: 'like',
  disliked: 'dislike',
} as const

export const FbFilmCard = memo(({ film, statuses, onRemove }: FbFilmCardProps) => {
  const navigate = useNavigate()
  const user = useTypedSelector(state => state.user.user)
  const title = film.name || film.original_name || ''
  const imgUrl = film.poster_path ? `${BaseMovieDBAssetsUrl}${film.poster_path}` : null

  const handleToggle = useCallback(
    async (status: IFilmStatus) => {
      if (!user) return
      const { id, poster_path, name, original_name } = film
      const updated = await FirebaseApi.toggleFilmStatus({
        userId: user.id,
        film: { id, poster_path, name, original_name },
        filmStatus: status,
      })
      if (!updated || !updated.status.includes(status)) {
        onRemove(film.id)
      }
    },
    [user, film, onRemove]
  )

  const handleNavigate = useCallback(() => navigate(`/films/${film.id}`), [navigate, film.id])

  return (
    <div className="group relative">
      <div
        role="button"
        tabIndex={0}
        onClick={handleNavigate}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleNavigate()}
        className="relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer bg-noir-card"
      >
        {imgUrl ? (
          <img src={imgUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <AbsentImg className="absolute inset-0 w-full h-full" />
        )}
      </div>
      <div className="flex gap-1 mt-1.5">
        {statuses.map(status => (
          <IconBtn
            key={status}
            type={statusToIcon[status]}
            isActive={film.status.includes(status)}
            onClick={() => handleToggle(status)}
          />
        ))}
      </div>
      <h3 className="text-xs text-text-base font-inter font-medium mt-1 line-clamp-2 md:text-sm">{title}</h3>
    </div>
  )
})

FbFilmCard.displayName = 'FbFilmCard'
