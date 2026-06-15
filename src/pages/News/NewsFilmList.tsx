import { useEffect, useRef, useState } from 'react'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import { ResultList } from '../../components/ui/ResultList/ResultList'
import { IMovieRes } from '../../api/types'
import { IDiscoverResult, MovieDBPageSize } from '../../api/types/responses'
import { getSearch, getTrendingMovies } from '../../api/movieDBApi'
import { usePageParam } from '../../hooks/usePageParam'
import { scrollTop } from '../../utils/scrollTop'
import { NewsListSkeleton } from './NewsSkeleton'

export type NewsTab = 'upcoming' | 'trending'

interface Props {
  activeTab: NewsTab
}

export const NewsFilmList = ({ activeTab }: Props) => {
  const [currentPage, setCurrentPage] = usePageParam()
  const [films, setFilms] = useState<IMovieRes[]>([])
  const [pagesData, setPagesData] = useState<Omit<IDiscoverResult, 'results'> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isFirstRender = useRef(true)

  const fetchFilms = async (tab: NewsTab, page: number) => {
    setIsLoading(true)
    const data =
      tab === 'trending'
        ? await getTrendingMovies('week', { page })
        : await getSearch({ type: 'movie', category: 'upcoming', params: { page } })
    const { results, ...rest } = data
    setFilms(results)
    setPagesData(rest)
    setIsLoading(false)
  }

  // initial load — respect URL page
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchFilms(activeTab, currentPage)
  }, [])

  // tab change — reset to page 1 (skip on first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setCurrentPage(1)
    fetchFilms(activeTab, 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
    fetchFilms(activeTab, page)
    scrollTop()
  }

  if (isLoading) return <NewsListSkeleton />

  return (
    <>
      <ResultList list={films} />
      {pagesData && pagesData.total_pages > 1 && (
        <Pagination
          totalCount={pagesData.total_pages}
          currentPage={currentPage}
          siblingCount={2}
          pageSize={MovieDBPageSize}
          onPageChange={onPageChange}
          className={'mx-auto mt-5 sm:mt-[30px] md:mt-10 lg:mt-14 2xl:mt-[71px]'}
        />
      )}
    </>
  )
}
