import { useCallback, useEffect, useMemo, useState } from 'react'
import { getSearch } from '../../api/movieDBApi'
import { IMovieRes } from '../../api/types'
import { setMovieDBPath } from '../../utils'
import { scrollTop } from '../../utils/scrollTop'
import type { IGetSearchParams } from '../../api/types/requests'
import { IOption } from '../../utils/getSelectedOption'
import { usePaginateData } from '../../hooks/usePaginateData'
import { getISODate } from '../../utils/getISODate'
import { usePageParam } from '../../hooks/usePageParam'
import { PremiereFilters } from './PremiereFilters'
import { PremiereSchedule } from './PremiereSchedule'
import type { MovieSchedule, PageInfo } from './types'

export const Premiere = () => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [sortValue, setSortValue] = useState<IOption[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDirty, setIsDirty] = useState(false)
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

  const backdropUrl = useMemo(() => {
    if (!movieSchedule) return null
    for (const [, films] of movieSchedule) {
      const film = films.find(f => f.backdrop_path)
      if (film) return setMovieDBPath(film.backdrop_path!)
    }
    return null
  }, [movieSchedule])

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
        setIsDirty(false)
      })
    },
    [startDate, endDate, genres, tomorrowDate, getGroupedMovie, setMovieSchedule, setPagesData]
  )

  useEffect(() => {
    fetchData(currentPage)
  }, [])

  const handleStartDateChange = useCallback((date: Date | null) => {
    setStartDate(date)
    setIsDirty(true)
  }, [])

  const handleEndDateChange = useCallback((date: Date | null) => {
    setEndDate(date)
    setIsDirty(true)
  }, [])

  const handleSortChange = useCallback((options: IOption[] | null) => {
    setSortValue(options)
    setIsDirty(true)
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

  return (
    <div className={'relative py-6'}>
      {backdropUrl && (
        <>
          <div
            style={{ backgroundImage: `url(${backdropUrl})` }}
            className={
              'absolute top-0 left-0 right-0 h-[380px] md:h-[440px] bg-no-repeat bg-cover bg-top opacity-35 pointer-events-none'
            }
          />
          <div
            className={
              'absolute top-0 left-0 right-0 h-[380px] md:h-[440px] bg-gradient-to-b from-transparent via-transparent to-noir pointer-events-none'
            }
          />
        </>
      )}
      <PremiereFilters
        startDate={startDate}
        endDate={endDate}
        tomorrowDate={tomorrowDate}
        sortValue={sortValue}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onSortChange={handleSortChange}
        onConfirm={handleConfirm}
        isConfirmDisabled={!isDirty}
      />
      <PremiereSchedule
        schedule={movieSchedule}
        pagesData={pagesData}
        currentPage={currentPage}
        isLoading={isLoading}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
