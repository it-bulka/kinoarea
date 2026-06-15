import { useTranslation } from 'react-i18next'
import { Typography, TypographyTypes } from '../../../components/ui/Typography/Typography'
import { MovieItem } from '../../../components/ui/MovieItem/MovieItem'
import { Pagination } from '../../../components/ui/Pagination/Pagination'
import type { IPersonCombinedCredits } from '../../../api/types/responses'

export interface ActorFilmsPagination {
  total_pages: number
  page: number
  max_per_page: number
}

const filmsPerPageAmount = 10

interface ActorFilmsProps {
  films: IPersonCombinedCredits[] | null
  totalCount: number
  pagesData: ActorFilmsPagination | null
  currentPage: number
  onPageChange: (page: number) => void
  onFilmClick: (id: number) => void
}

export const ActorFilms = ({
  films,
  totalCount,
  pagesData,
  currentPage,
  onPageChange,
  onFilmClick,
}: ActorFilmsProps) => {
  const { t } = useTranslation()

  return (
    <section>
      <Typography variant={'h4'} type={TypographyTypes._TITLE}>
        {t('actor.films')}
      </Typography>
      <div>
        <p>{t('actor.filmsCount', { count: totalCount })}</p>
        {!totalCount && <p>{t('actor.noFilms')}</p>}
        {films?.map(item => (
          <MovieItem
            name={item.media_type === 'movie' ? item.title : item.name}
            img={item.poster_path}
            overview={item.overview}
            character={t('actor.role', { character: item.character })}
            rating={item.vote_average}
            key={item.id}
            onClick={() => onFilmClick(item.id)}
          />
        ))}
      </div>
      {pagesData && (
        <Pagination
          totalCount={totalCount}
          currentPage={currentPage}
          siblingCount={pagesData.total_pages >= 5 ? 2 : undefined}
          pageSize={filmsPerPageAmount}
          onPageChange={onPageChange}
          className={'mx-auto mt-4 md:mt-8 ld:mt-9 2xl:mt-11'}
        />
      )}
    </section>
  )
}
