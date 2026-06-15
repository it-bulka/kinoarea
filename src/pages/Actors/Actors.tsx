import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import { PageHero } from '../../components/ui/PageHero/PageHero'
import { MovieDBPageSize } from '../../api/types/responses'
import { ActorsSkeleton } from './ActorsSkeleton'
import { ActorsList } from './ActorsList'
import { useActors } from './hooks/useActors'

export const Actors = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { actors, pagesData, isLoading, currentPage, onPageChange } = useActors()

  const onActorClick = useCallback((id: number) => navigate(`/actors/${id}`), [navigate])

  if (isLoading) return <ActorsSkeleton />

  return (
    <section className="container pb-9 lg:pb-10 2xl:pb-[70px]">
      <PageHero title={t('actor.title')} />
      <ActorsList actors={actors} onActorClick={onActorClick} />
      {pagesData && pagesData.total_pages > 1 && (
        <Pagination
          totalCount={pagesData.total_pages}
          currentPage={currentPage}
          siblingCount={pagesData.total_pages >= 5 ? 2 : undefined}
          pageSize={MovieDBPageSize}
          onPageChange={onPageChange}
          className="mx-auto mt-4 md:mt-8 lg:mt-9 2xl:mt-11"
        />
      )}
    </section>
  )
}
