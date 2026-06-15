import { useCallback, useEffect, useRef, useState } from 'react'
import { IMovieRes } from '../../../api/types'
import { IDiscoverResult, MovieDBPageSize } from '../../../api/types/responses'
import { getSearch, getTrendingMovies } from '../../../api/movieDBApi'
import { usePageParam } from '../../../hooks/usePageParam'
import { scrollTop } from '../../../utils/scrollTop'

export type NewsTab = 'upcoming' | 'trending'

export const useNewsFilms = (activeTab: NewsTab) => {
  const [currentPage, setCurrentPage] = usePageParam()
  const [films, setFilms] = useState<IMovieRes[]>([])
  const [pagesData, setPagesData] = useState<Omit<IDiscoverResult, 'results'> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isFirstRender = useRef(true)

  const fetchFilms = useCallback(async (tab: NewsTab, page: number) => {
    setIsLoading(true)
    const data =
      tab === 'trending'
        ? await getTrendingMovies('week', { page })
        : await getSearch({ type: 'movie', category: 'upcoming', params: { page } })
    const { results, ...rest } = data
    setFilms(results)
    setPagesData(rest)
    setIsLoading(false)
  }, [])

  // initial load — respect URL page
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchFilms(activeTab, currentPage)
  }, [])

  // tab change — reset to page 1, skip on first render
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setCurrentPage(1)
    fetchFilms(activeTab, 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  const onPageChange = useCallback(
    (page: number) => {
      setCurrentPage(page)
      fetchFilms(activeTab, page)
      scrollTop()
    },
    [activeTab, fetchFilms, setCurrentPage]
  )

  return { films, pagesData, isLoading, currentPage, onPageChange, pageSize: MovieDBPageSize }
}
