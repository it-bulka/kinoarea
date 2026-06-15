import { Typography, TypographyTypes } from '../../components/ui/Typography/Typography'
import { Breadcrumbs } from '../../components/ui/Breadcrumbs/Breadcrumbs'
import { Schedule } from '../../components/Schedule/Schedule'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getSearch } from '../../api/movieDBApi'
import { IMovieRes } from '../../api/types'
import { getDate } from '../../utils'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import { IDiscoverResult, MovieDBPageSize } from '../../api/types/responses'
import { scrollTop } from '../../utils/scrollTop'
import type { IGetSearchParams } from '../../api/types/requests'
import { DateInput } from '../../components/ui/DateInput/DateInput'
import { CustomSelect } from '../../components/ui/Select/Select'
import { genresOptions } from '../../utils/getGenres'
import { Button } from '../../components/ui/Button/Button'
import { IOption } from '../../utils/getSelectedOption'
import { usePaginateData } from '../../hooks/usePaginateData'
import { getISODate } from '../../utils/getISODate'
import { PremiereSkeleton } from './PremiereSkeleton'
import { useTranslation } from 'react-i18next'

type MovieSchedule = Array<[string, IMovieRes[]]>
type PageInfo = Omit<IDiscoverResult, 'results'>
export const Premiere = () => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [sortValue, setSortValue] = useState<IOption[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation()
  const {
    data: movieSchedule,
    setData: setMovieSchedule,
    pagesData,
    setPagesData,
    onPaginationChange,
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

  const setData = (page?: number) => {
    const startPremier = getISODate(startDate || tomorrowDate)

    const requestParams: IGetSearchParams = {
      type: 'movie',
      category: 'upcoming',
      params: {
        sort_by: 'primary_release_date.asc',
        'primary_release_date.gte': startPremier,
        page: page || 1,
        with_genres: genres,
      },
    }
    if (endDate) requestParams.params!['primary_release_date.lte'] = getISODate(endDate)

    setIsLoading(true)
    getSearch(requestParams).then(res => {
      const { results, ...pages } = res
      const movies = getGroupedMovie(results)
      setMovieSchedule(movies)
      setPagesData(pages)
      scrollTop()
      setIsLoading(false)
    })
  }

  useEffect(() => {
    setData()
  }, [])

  if (isLoading) return <PremiereSkeleton />

  return (
    <div className={'py-6'}>
      <section className={'container'}>
        <div>
          <Typography
            className={'max-w-[284px] mx-auto text-center md:max-w-full md:text-start'}
            variant={'h1'}
            type={TypographyTypes._TITLE}
          >
            {t('premiere.title')}
          </Typography>
          <Breadcrumbs className={'flex-center mt-1 mb-2 md:justify-start md:mb-1.5 lg:mb-2 2xl:mb-3.5'} />
          <p className={'text-13 font-q-500 text-center md:text-start md:text-15 2xl:text-lg'}>
            {t('premiere.description')}
          </p>
        </div>
        <div className={'my-[21.5px]'}>
          <Typography className={'text-center md:text-left'}>{t('premiere.period')}</Typography>
          <div className={'flex md:w-1/2 lg:w-2/5'}>
            <DateInput
              date={startDate || tomorrowDate}
              onChange={setStartDate}
              placeholderText={t('premiere.startDate')}
              wrapperClassName={'flex-1'}
            />
            <span className={'px-3 lg:flex-[0.5] flex-center'}>-</span>
            <DateInput
              date={endDate}
              onChange={setEndDate}
              placeholderText={t('premiere.endDate')}
              wrapperClassName={'flex-1'}
            />
          </div>
        </div>
        <div className={'my-[21.5px]'}>
          <Typography className={'text-center md:text-left'}>{t('premiere.genres')}</Typography>
          <CustomSelect
            options={genresOptions}
            value={sortValue}
            onChange={selectedOptions => setSortValue(selectedOptions as IOption[])}
            placeholder={t('premiere.allGenres')}
            className={'md:w-1/2 lg:w-2/5'}
            isMulti
            withCustomOptions
          />
        </div>
        <Button className={'ml-auto'} onClick={() => setData()}>
          {t('premiere.confirm')}
        </Button>
      </section>

      {movieSchedule?.map(item => {
        const data = item[0]
        return (
          <section key={data} className={'container mt-7 md:mt-10 2xl:mt-16'}>
            <Schedule period={getDate(data)} films={item[1]} />
          </section>
        )
      })}

      {pagesData?.page && pagesData?.total_pages > 1 && (
        <Pagination
          totalCount={pagesData?.total_pages || 0}
          currentPage={pagesData?.page}
          siblingCount={pagesData?.total_pages >= 5 ? 2 : undefined}
          pageSize={MovieDBPageSize}
          onPageChange={(pageNum: number) => onPaginationChange(pageNum, setData)}
          className={'mx-auto mt-4 md:mt-8 ld:mt-9 2xl:mt-11'}
        />
      )}
    </div>
  )
}
