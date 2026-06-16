import { useCallback, useEffect, useRef, useState } from 'react'
import { MovieDBAPI } from '../../../api/movieDBApi'
import { MovieDBPageSize, type IDiscoverResult } from '../../../api/types/responses'
import type { IMovies } from '../../../api/types'
import type { IParams, MovieSort, MOVIETV } from '../../../api/types/requests'
import { usePageParam } from '../../../hooks/usePageParam'
import { scrollTop } from '../../../utils/scrollTop'

export interface UseSearchFilmsReturn {
  films: IMovies
  pagesData: Omit<IDiscoverResult, 'results'> | null
  isLoading: boolean
  currentPage: number
  pageSize: number
  categoryValue: MOVIETV
  sortValue: MovieSort | 'notchosen' | null
  searchRef: React.RefObject<HTMLInputElement>
  handleSearch: () => void
  handleCategoryChange: (opt: unknown) => void
  handleSortChange: (opt: unknown) => void
  handlePageChange: (page: number) => void
}

interface ISortOption {
  value: MovieSort | 'notchosen'
  label: string
}

export const useSearchFilms = (): UseSearchFilmsReturn => {
  const [categoryValue, setCategoryValue] = useState<MOVIETV>('movie')
  const [sortValue, setSortValue] = useState<MovieSort | 'notchosen' | null>(null)
  const [films, setFilms] = useState<IMovies>([])
  const [pagesData, setPagesData] = useState<Omit<IDiscoverResult, 'results'> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = usePageParam()
  const searchRef = useRef<HTMLInputElement>(null)

  const search = useCallback(
    async (page: number, category: MOVIETV = categoryValue, sort: MovieSort | 'notchosen' | null = sortValue) => {
      setIsLoading(true)
      const params: IParams = { page }
      if (sort && sort !== 'notchosen') params.sort_by = sort
      if (searchRef.current?.value) params.with_keywords = searchRef.current.value

      const data = await MovieDBAPI.getSearch({ type: category, params })
      if (!data) return

      const { results, ...rest } = data
      setFilms(results)
      setPagesData(rest)
      setIsLoading(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    search(currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = useCallback(() => {
    setCurrentPage(1)
    search(1, categoryValue, sortValue)
  }, [search, setCurrentPage, categoryValue, sortValue])

  const handleCategoryChange = useCallback(
    (opt: unknown) => {
      const newCategory = (opt as { value: MOVIETV }).value
      setCategoryValue(newCategory)
      setCurrentPage(1)
      search(1, newCategory, sortValue)
    },
    [search, setCurrentPage, sortValue]
  )

  const handleSortChange = useCallback(
    (opt: unknown) => {
      const newSort = (opt as ISortOption | null)?.value ?? null
      setSortValue(newSort)
      setCurrentPage(1)
      search(1, categoryValue, newSort)
    },
    [search, setCurrentPage, categoryValue]
  )

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page)
      search(page, categoryValue, sortValue)
      scrollTop()
    },
    [search, setCurrentPage, categoryValue, sortValue]
  )

  return {
    films,
    pagesData,
    isLoading,
    currentPage,
    pageSize: MovieDBPageSize,
    categoryValue,
    sortValue,
    searchRef,
    handleSearch,
    handleCategoryChange,
    handleSortChange,
    handlePageChange,
  }
}
