import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageHero } from '../../components/ui/PageHero/PageHero'
import { FilmPostersGrid } from './FilmPostersGrid'
import { FilmPostersSkeleton } from './FilmPostersSkeleton'
import { useFilmPosters } from './hooks/useFilmPosters'
import { setMovieDBPath } from '../../utils'
import { Paths } from '../../router/paths'

export const FilmPosters = () => {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const { posters, film, isLoading } = useFilmPosters(slug!)

  const filmSlugPath = `/films/${slug}`

  if (isLoading) return <FilmPostersSkeleton />

  return (
    <main className={'container pt-6 pb-12 md:pt-9 md:pb-14 lg:pt-7'}>
      <PageHero
        title={t('film.posters')}
        supertitle={film?.title ? `${t('film.filmLabel')} ${film.title}` : undefined}
        lastCrumb={t('film.allPosters')}
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

      <section aria-label={t('film.posters')}>
        {posters.length === 0 ? (
          <p className={'py-12 text-center text-text-muted font-inter'}>{t('film.noPosters')}</p>
        ) : (
          <FilmPostersGrid posters={posters} />
        )}
      </section>
    </main>
  )
}
