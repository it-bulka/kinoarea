import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionHeader, SectionHeaderType } from '../../../../components/ui/SectionHeader/SectionHeader'
import { CastList } from '../../../../components/ui/CastList/CastList'
import { FilmCastSkeleton } from '../FilmCastSkeleton'
import { Paths } from '../../../../router/paths'
import type { ICastRes } from '../../../../api/types/responses'

interface FilmCastProps {
  slug: string
  cast: ICastRes[]
  isLoading: boolean
}

export const FilmCast = memo(({ slug, cast, isLoading }: FilmCastProps) => {
  const { t } = useTranslation()

  return (
    <section>
      <SectionHeader
        title={t('film.cast')}
        type={SectionHeaderType.ARROW}
        linkTitle={t('film.allActors')}
        moveToViaArrow={Paths.film.actors(slug)}
        className={'mb-4 mt-7 md:mb-8 2xl:mb-20'}
      />
      {isLoading ? <FilmCastSkeleton /> : <CastList list={cast} />}
    </section>
  )
})

FilmCast.displayName = 'FilmCast'
