import { useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageHero } from '../../components/ui/PageHero/PageHero'
import { ActorsSkeleton } from '../Actors/ActorsSkeleton'
import { FilmActorsList } from './FilmActorsList'
import { useFilmActors } from './hooks/useFilmActors'
import { setMovieDBPath } from '../../utils'
import { Paths } from '../../router/paths'

export const FilmActors = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { cast, film, isLoading } = useFilmActors(slug!)

  const onActorClick = useCallback((id: number) => navigate(`/actors/${id}`), [navigate])

  const filmSlugPath = `/films/${slug}`

  return (
    <main className={'container pt-6 pb-12 md:pt-9 md:pb-14 lg:pt-7'}>
      <PageHero
        title={t('film.cast')}
        supertitle={film?.title ? `${t('film.filmLabel')} ${film.title}` : undefined}
        lastCrumb={t('film.allActors')}
        crumbLabels={{ [filmSlugPath]: film?.title ?? slug! }}
      />

      {film && (
        <Link to={Paths.film.detail(slug!)} className={'flex items-center gap-3 mb-8 w-fit group'}>
          <img
            src={setMovieDBPath(film.poster_path)}
            alt={film.title}
            className={'w-12 h-[68px] object-cover rounded-lg flex-shrink-0'}
            loading={'lazy'}
          />
          <div>
            <p className={'text-xs text-text-muted mb-0.5'}>← {t('film.watchFilm')}</p>
            <h2
              className={
                'font-playfair font-bold text-text-base group-hover:text-gold transition-colors duration-200 line-clamp-2'
              }
            >
              {film.title}
            </h2>
          </div>
        </Link>
      )}

      <section aria-label={t('film.cast')}>
        {isLoading ? <ActorsSkeleton /> : <FilmActorsList cast={cast} onActorClick={onActorClick} />}
      </section>
    </main>
  )
}
