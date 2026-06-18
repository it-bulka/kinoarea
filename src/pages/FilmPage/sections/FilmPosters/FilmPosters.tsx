import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionHeader, SectionHeaderType } from '../../../../components/ui/SectionHeader/SectionHeader'
import { PostersList } from '../../../../components/ui/PostersList/PostersList'
import { FilmPostersSkeleton } from '../FilmPostersSkeleton'
import { Paths } from '../../../../router/paths'
import type { IPoster } from '../../../../api/types/responses'

interface FilmPostersProps {
  slug: string
  posters: IPoster[]
  isLoading: boolean
}

export const FilmPosters = memo(({ slug, posters, isLoading }: FilmPostersProps) => {
  const { t } = useTranslation()

  return (
    <section>
      <SectionHeader
        title={t('film.posters')}
        type={SectionHeaderType.ARROW}
        linkTitle={t('film.allPosters')}
        moveToViaArrow={Paths.film.posters(slug)}
        className={'mb-4 mt-7 md:mb-8 2xl:mb-20'}
      />
      {isLoading ? (
        <FilmPostersSkeleton />
      ) : posters.length === 0 ? (
        <p className={'py-6 text-center text-text-muted font-inter text-sm'}>{t('film.noPosters')}</p>
      ) : (
        <PostersList list={posters} />
      )}
    </section>
  )
})

FilmPosters.displayName = 'FilmPosters'
