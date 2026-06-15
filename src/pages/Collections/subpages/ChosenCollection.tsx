import { useCallback, useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useTranslation } from 'react-i18next'
import { Typography, TypographyTypes } from '../../../components/ui/Typography/Typography'
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs/Breadcrumbs'
import { Pagination } from '../../../components/ui/Pagination/Pagination'
import { ResultList } from '../../../components/ui/ResultList/ResultList'
import { IDiscoverResult } from '../../../api/types/responses'
import { CATEGORY, IGetSearchParams, IParams } from '../../../api/types/requests'
import { getSearch } from '../../../api/movieDBApi'
import { scrollTop } from '../../../utils/scrollTop'
import { usePageParam } from '../../../hooks/usePageParam'
import { CollectionsSkeleton } from '../CollectionsSkeleton'

export const ChosenCollection = () => {
  const { title, params, category } = useOutletContext() as { title: string; params?: IParams; category?: CATEGORY }
  const { t } = useTranslation()
  const [films, setFilms] = useState<IDiscoverResult>()
  const [currentPage, setCurrentPage] = usePageParam()
  const [isLoading, setIsLoading] = useState(true)
  const headerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (isLoading) return
      gsap.from('.chosen-header-item', { y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' })
    },
    { scope: headerRef, dependencies: [isLoading] }
  )

  const fetchFilms = useCallback(
    async (page: number) => {
      setIsLoading(true)
      const options: IGetSearchParams = {
        type: 'movie',
        params: params ? { ...params, page } : { page },
      }
      if (category) options.category = category
      const data = await getSearch(options)
      setFilms(data)
      setIsLoading(false)
    },
    [category, params]
  )

  useEffect(() => {
    fetchFilms(currentPage)
  }, [])

  const changePage = useCallback(
    (page: number) => {
      fetchFilms(page)
      setCurrentPage(page)
      scrollTop()
    },
    [fetchFilms, setCurrentPage]
  )

  if (isLoading) return <CollectionsSkeleton />

  return (
    <section className="container pb-9 lg:pb-10 2xl:pb-[70px]">
      <div ref={headerRef}>
        <Typography variant="h1" type={TypographyTypes._TITLE} className="chosen-header-item">
          {title}
        </Typography>
        <div className="chosen-header-item">
          <Breadcrumbs lastCrumb={title} />
        </div>
        <p className="chosen-header-item py-3 text-white/60">
          {t('collections.total', { count: films?.total_results ?? 0 })}
        </p>
      </div>

      <ResultList list={films?.results || []} />

      <Pagination
        totalCount={films?.total_results || 0}
        currentPage={currentPage}
        siblingCount={2}
        pageSize={10}
        onPageChange={changePage}
        className="mx-auto mt-5"
      />
    </section>
  )
}
