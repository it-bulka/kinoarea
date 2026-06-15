import { useCallback, useEffect, useMemo, useState } from 'react'
import { getSearch } from '../../api/movieDBApi'
import { IMovieRes } from '../../api/types'
import { getDate } from '../../utils'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import { IDiscoverResult, MovieDBPageSize } from '../../api/types/responses'
import { scrollTop } from '../../utils/scrollTop'
import type { IGetSearchParams } from '../../api/types/requests'
import { IOption } from '../../utils/getSelectedOption'
import { usePaginateData } from '../../hooks/usePaginateData'
import { getISODate } from '../../utils/getISODate'
import { PremiereSkeleton } from './PremiereSkeleton'
import { Schedule } from '../../components/Schedule/Schedule'
import { usePageParam } from '../../hooks/usePageParam'
import { PremiereFilters } from './PremiereFilters'

type MovieSchedule = Array<[string, IMovieRes[]]>
type PageInfo = Omit<IDiscoverResult, 'results'>

export const Premiere = () => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [sortValue, setSortValue] = useState<IOption[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = usePageParam()
  const {
    data: movieSchedule,
    setData: setMovieSchedule,
    pagesData,
    setPagesData,
  } = usePaginateData<MovieSchedule, PageInfo>()

  const tomorrowDate: Date = useMemo(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    return tomorrow
  }, [])

  const genres = useMemo(() => {
    return sortValue ? sortValue.map(option => option.value).join(',') : ''
  }, [sortValue])

  const getGroupedMovie = useCallback((results: IMovieRes[]): MovieSchedule => {
    const data = new Map<string, IMovieRes[]>()
    results.forEach(movie => {
      const key = movie.release_date
      if (data.has(key)) {
        data.get(key)?.push(movie)
        return
      }
      data.set(movie.release_date, [movie])
    })
    return [...data.entries()]
  }, [])

  const fetchData = useCallback(
    (page: number) => {
      const startPremier = getISODate(startDate || tomorrowDate)
      const requestParams: IGetSearchParams = {
        type: 'movie',
        category: 'upcoming',
        params: {
          sort_by: 'primary_release_date.asc',
          'primary_release_date.gte': startPremier,
          page,
          with_genres: genres,
        },
      }
      if (endDate) requestParams.params!['primary_release_date.lte'] = getISODate(endDate)

      setIsLoading(true)
      getSearch(requestParams).then(res => {
        const { results, ...pages } = res
        setMovieSchedule(getGroupedMovie(results))
        setPagesData(pages)
        scrollTop()
        setIsLoading(false)
      })
    },
    [startDate, endDate, genres, tomorrowDate, getGroupedMovie, setMovieSchedule, setPagesData]
  )

  useEffect(() => {
    fetchData(currentPage)
  }, [])

  const handleConfirm = useCallback(() => {
    setCurrentPage(1)
    fetchData(1)
  }, [setCurrentPage, fetchData])

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page)
      fetchData(page)
    },
    [setCurrentPage, fetchData]
  )

  if (isLoading) return <PremiereSkeleton />

  return (
    <div className={'py-6'}>
      <PremiereFilters
        startDate={startDate}
        endDate={endDate}
        tomorrowDate={tomorrowDate}
        sortValue={sortValue}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSortChange={setSortValue}
        onConfirm={handleConfirm}
      />

      {movieSchedule?.map(item => {
        const date = item[0]
        return (
          <section key={date} className={'container mt-7 md:mt-10 2xl:mt-16'}>
            <Schedule period={getDate(date)} films={item[1]} />
          </section>
        )
      })}

      {pagesData && pagesData.total_pages > 1 && (
        <Pagination
          totalCount={pagesData.total_pages}
          currentPage={currentPage}
          siblingCount={pagesData.total_pages >= 5 ? 2 : undefined}
          pageSize={MovieDBPageSize}
          onPageChange={handlePageChange}
          className={'mx-auto mt-4 md:mt-8 ld:mt-9 2xl:mt-11'}
        />
      )}
    </div>
  )
}
