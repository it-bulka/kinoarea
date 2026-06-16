import { Typography, TypographyTypes } from '../../components/ui/Typography/Typography'
import { ResultList } from '../../components/ui/ResultList/ResultList'
import { CustomSelect } from '../../components/ui/Select/Select'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SearchBar } from '../../components/ui/SearchBar/SearchBar'
import { IParams, MovieSort, MOVIETV } from '../../api/types/requests'
import { MovieDBAPI } from '../../api/movieDBApi'
import { IDiscoverResult, MovieDBPageSize } from '../../api/types/responses'
import { IMovies } from '../../api/types'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import { scrollTop } from '../../utils/scrollTop'
import { SearchResultSkeleton } from './SearchResultSkeleton'
import { useTranslation } from 'react-i18next'
import { usePageParam } from '../../hooks/usePageParam'

interface IOption {
  value: string
  label: string
}

interface ISortOption extends IOption {
  value: MovieSort | 'notchosen'
}

export const SearchResult = () => {
  const { t } = useTranslation()

  const categoryOptions = useMemo(
    () => [
      { value: 'movie' as MOVIETV, label: t('search.category.movie') },
      { value: 'tv' as MOVIETV, label: t('search.category.tv') },
    ],
    [t]
  )

  const sortOptions = useMemo<ISortOption[]>(
    () => [
      { value: 'notchosen', label: t('search.sort.none') },
      { value: 'popularity.desc', label: t('search.sort.popularDesc') },
      { value: 'popularity.asc', label: t('search.sort.popularAsc') },
      { value: 'revenue.desc', label: t('search.sort.revenueDesc') },
      { value: 'revenue.asc', label: t('search.sort.revenueAsc') },
      { value: 'primary_release_date.desc', label: t('search.sort.newestFirst') },
      { value: 'primary_release_date.asc', label: t('search.sort.oldestFirst') },
    ],
    [t]
  )

  const [categoryValue, setCategoryValue] = useState<MOVIETV>('movie')
  const [sortValue, setSortValue] = useState<MovieSort | 'notchosen' | null>(null)
  const ref = useRef<HTMLInputElement>(null)
  const [pagesData, setPagesData] = useState<Omit<IDiscoverResult, 'results'> | null>(null)
  const [films, setFilms] = useState<IMovies>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = usePageParam()

  const category = categoryOptions.find(o => o.value === categoryValue) ?? categoryOptions[0]
  const selectedSort = sortOptions.find(o => o.value === sortValue) ?? null

  const search = async (
    page: number = 1,
    category: MOVIETV = categoryValue,
    sort: MovieSort | 'notchosen' | null = sortValue
  ) => {
    setIsLoading(true)
    const params: IParams = { page }
    if (sort && sort !== 'notchosen') params.sort_by = sort
    if (ref.current) params.with_keywords = ref.current.value

    const data = await MovieDBAPI.getSearch({ type: category, params })

    if (!data) return
    const { results, ...rest } = data
    setFilms(results)
    setPagesData(rest)
    setIsLoading(false)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    search(currentPage)
  }, [])

  const handleSelectCategory = (selectedOptions: unknown) => {
    const newCategory = (selectedOptions as { value: MOVIETV }).value
    setCategoryValue(newCategory)
    setCurrentPage(1)
    search(1, newCategory)
  }

  const handleSelect = (selectedOptions: unknown) => {
    const newSort = (selectedOptions as ISortOption | null)?.value ?? null
    setSortValue(newSort)
    setCurrentPage(1)
    search(1, categoryValue, newSort)
  }

  const onSearch = () => {
    setCurrentPage(1)
    search(1)
  }

  const onPaginationChange = (page: number) => {
    setCurrentPage(page)
    search(page)
    scrollTop()
  }

  if (isLoading) return <SearchResultSkeleton />

  return (
    <section className={'container'}>
      <SearchBar className={'mt-4 mb-2'} ref={ref} onSearch={onSearch} />
      <div className={'md:flex'}>
        <div className={'md:basis-2/3'}>
          <Typography variant={'h1'} type={TypographyTypes._TITLE}>
            {t('search.title')}
          </Typography>
          <h3 className={'text-15 font-inter font-semibold md:text-xl 2xl:text-3xl'}>
            {ref.current?.value} ({t('search.results', { count: pagesData?.total_results ?? 0 })})
          </h3>
          <p className={'text-sm font-inter font-semibold md:text-17 2xl:text-2xl'}>{category.label}:</p>
        </div>
        <div className={'md:basis-1/3'}>
          <CustomSelect
            options={categoryOptions}
            value={category}
            onChange={handleSelectCategory}
            isClearable={false}
          />
          <CustomSelect
            options={sortOptions}
            value={selectedSort}
            onChange={handleSelect}
            placeholder={t('search.sortPlaceholder')}
          />
        </div>
      </div>

      <ResultList list={films} />
      {pagesData && pagesData.total_pages > 1 && (
        <Pagination
          totalCount={pagesData.total_pages}
          currentPage={currentPage}
          siblingCount={pagesData.total_pages >= 5 ? 2 : undefined}
          pageSize={MovieDBPageSize}
          onPageChange={onPaginationChange}
          className={'mx-auto mt-4 md:mt-8 ld:mt-9 2xl:mt-11'}
        />
      )}
    </section>
  )
}
