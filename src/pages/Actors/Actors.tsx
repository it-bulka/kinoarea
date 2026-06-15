import { Pagination } from '../../components/ui/Pagination/Pagination'
import { IPerson, IPersonResult, MovieDBPageSize } from '../../api/types/responses'
import { useCallback, useEffect, useState } from 'react'
import { getPersons } from '../../api/movieDBApi'
import { PersonItem } from '../../components/ui/PersonItem/PersonItem'
import { scrollTop } from '../../utils/scrollTop'
import { Typography, TypographyTypes } from '../../components/ui/Typography/Typography'
import { useNavigate } from 'react-router-dom'
import { ActorsSkeleton } from './ActorsSkeleton'
import { useTranslation } from 'react-i18next'
import { usePageParam } from '../../hooks/usePageParam'

export const Actors = () => {
  const [actors, setActors] = useState<IPerson[]>([])
  const [pagesData, setPagesData] = useState<Omit<IPersonResult, 'results'> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = usePageParam()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const setData = useCallback((page?: number) => {
    const params = page ? { page } : undefined
    setIsLoading(true)
    getPersons(params).then(res => {
      const { results, ...pages } = res
      setActors(results)
      setPagesData(pages)
      scrollTop()
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    setData(currentPage)
  }, [])

  const onPaginationChange = useCallback(
    (page: number) => {
      setCurrentPage(page)
      setData(page)
    },
    [setCurrentPage, setData]
  )

  if (isLoading) return <ActorsSkeleton />

  return (
    <section className={'container'}>
      <Typography variant={'h1'} type={TypographyTypes._TITLE}>
        {t('actor.title')}
      </Typography>
      {actors.map(actor => (
        <PersonItem
          img={actor.profile_path}
          name={actor.name}
          rating={actor.popularity}
          known_for={actor.known_for}
          onClick={() => navigate(`/actors/${actor.id}`)}
          key={actor.id}
        />
      ))}
      {pagesData?.page && pagesData?.total_pages > 1 && (
        <Pagination
          totalCount={pagesData?.total_pages || 0}
          currentPage={currentPage}
          siblingCount={pagesData?.total_pages >= 5 ? 2 : undefined}
          pageSize={MovieDBPageSize}
          onPageChange={onPaginationChange}
          className={'mx-auto mt-4 md:mt-8 ld:mt-9 2xl:mt-11'}
        />
      )}
    </section>
  )
}
