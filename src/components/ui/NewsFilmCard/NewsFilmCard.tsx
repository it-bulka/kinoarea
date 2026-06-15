import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { IMovieRes } from '../../../api/types'
import { setMovieDBPath } from '../../../utils'
import { RateBadge } from '../RateBadge/RateBadge'
import { Button } from '../Button/Button'
import { AbsentImg } from '../AbsentImg/AbsentImg'

interface NewsFilmCardProps {
  item: IMovieRes
  onClick: (id: number) => void
}

export const NewsFilmCard = memo(({ item, onClick }: NewsFilmCardProps) => {
  const { t } = useTranslation()
  const title = item.title || item.name || ''
  const year = (item.release_date || String(item.first_air_date || '')).slice(0, 4)

  const handleClick = useCallback(() => onClick(item.id), [onClick, item.id])
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') onClick(item.id)
    },
    [onClick, item.id]
  )

  return (
    <div
      role="button"
      tabIndex={0}
      className="news-film-card group relative overflow-hidden rounded-xl cursor-pointer bg-darkBlue-2 aspect-[2/3] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(54,87,203,0.45)] hover:scale-[1.03] hover:-translate-y-1"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {item.poster_path ? (
        <img
          src={setMovieDBPath(item.poster_path)}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <AbsentImg className="absolute inset-0 w-full h-full" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/10 to-transparent" />

      <div className="absolute inset-0 bg-blue/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-center">
        <Button variant="white">{t('collections.browse')}</Button>
      </div>

      <div className="absolute top-2.5 right-2.5 z-10">
        <RateBadge rating={item.vote_average} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 p-3 md:p-4">
        <h3 className="text-sm md:text-base font-q-700 text-white leading-tight line-clamp-2">{title}</h3>
        {year && <p className="text-[11px] text-white/50 mt-0.5">{year}</p>}
      </div>
    </div>
  )
})

NewsFilmCard.displayName = 'NewsFilmCard'
