import { useOutletContext } from 'react-router-dom'
import { getSearch } from '../../../api/movieDBApi'
import { useEffect, useState } from 'react'
import { Typography, TypographyTypes } from '../../../components/ui/Typography/Typography'
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs/Breadcrumbs'
import { Pagination } from '../../../components/ui/Pagination/Pagination'
import { ResultList } from '../../../components/ui/ResultList/ResultList'
import { IDiscoverResult } from '../../../api/types/responses'
import { scrollTop } from '../../../utils/scrollTop'
import { CATEGORY, IGetSearchParams, IParams } from '../../../api/types/requests'
import { CollectionsSkeleton } from '../CollectionsSkeleton'

export const ChosenCollection = () => {
  const { title, params, category } = useOutletContext() as { title: string; params?: IParams; category?: CATEGORY }
  const [films, setFilms] = useState<IDiscoverResult>()
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const fetch = async (page: number = 1) => {
    setIsLoading(true)
    const options: IGetSearchParams = {
      type: 'movie',
      params: params ? { ...params, page } : { page },
    }
    if (category) options.category = category
    const data = await getSearch(options)
    setFilms(data)
    setIsLoading(false)
  }
  useEffect(() => {
    fetch()
  }, [])

  const changePage = (page: number) => {
    fetch(page)
    setCurrentPage(page)
    scrollTop()
  }

  if (isLoading) return <CollectionsSkeleton />

  return (
    <section className={'container pb-9 lg:pb-10 2xl:pb-[70px]'}>
      <Typography variant={'h1'} type={TypographyTypes._TITLE}>
        Подборки фильмов
      </Typography>
      <Breadcrumbs lastCrumb={title} />

      <p className={'py-3'}>Всего найдено: {films?.total_results}</p>
      <ResultList list={films?.results || []} />

      <Pagination
        totalCount={films?.total_results || 0}
        currentPage={currentPage}
        siblingCount={2}
        pageSize={10}
        onPageChange={changePage}
        className={'mx-auto mt-5'}
      />
    </section>
  )
}
