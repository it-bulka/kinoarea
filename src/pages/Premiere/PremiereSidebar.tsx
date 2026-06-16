import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getDate, setMovieDBPath } from '../../utils'
import type { MovieSchedule } from './types'

interface PremiereSidebarProps {
  schedule: MovieSchedule | null
}

export const PremiereSidebar = ({ schedule }: PremiereSidebarProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const topFilms = useMemo(() => {
    if (!schedule) return []
    return schedule.flatMap(([, films]) => films).slice(0, 6)
  }, [schedule])

  if (!topFilms.length) return null

  return (
    <div>
      <h3 className={'font-playfair font-bold text-lg text-text-base mb-4 pb-3 border-b border-noir-border'}>
        {t('premiere.topPremieres')}
      </h3>
      <ul className={'flex flex-col gap-3'}>
        {topFilms.map(film => (
          <li key={film.id}>
            <button
              onClick={() => navigate(`/films/${film.id}`)}
              className={
                'flex gap-3 w-full p-2.5 rounded-lg bg-noir-card hover:bg-noir-soft transition-colors text-left group'
              }
            >
              {film.poster_path ? (
                <img
                  src={setMovieDBPath(film.poster_path)}
                  alt={film.title || film.name || ''}
                  className={'w-14 h-20 object-cover rounded-md flex-shrink-0'}
                />
              ) : (
                <div className={'w-14 h-20 rounded-md flex-shrink-0 bg-noir-soft'} />
              )}
              <div className={'min-w-0 flex flex-col justify-between py-0.5'}>
                <p
                  className={
                    'font-inter font-medium text-sm text-text-base line-clamp-2 group-hover:text-gold transition-colors'
                  }
                >
                  {film.title || film.name}
                </p>
                <p className={'text-xs text-text-muted mt-auto'}>{getDate(film.release_date)}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
