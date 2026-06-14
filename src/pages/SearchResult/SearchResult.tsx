import { Typography, TypographyTypes } from '../../components/ui/Typography/Typography'
import { ResultList } from '../../components/ui/ResultList/ResultList'
import { CustomSelect } from '../../components/ui/Select/Select'
import { useEffect, useRef, useState } from 'react'
import { SearchBar } from '../../components/ui/SearchBar/SearchBar'
import { IParams, MovieSort, MOVIETV } from '../../api/types/requests'
import { MovieDBAPI } from '../../api/movieDBApi'
import { IDiscoverResult, MovieDBPageSize } from '../../api/types/responses'
import { IMovies } from '../../api/types'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import { scrollTop } from '../../utils/scrollTop'
import { SearchResultSkeleton } from './SearchResultSkeleton'

interface IOption {
  value: string
  label: string
}

interface ICategoryOption extends IOption {
  value: MOVIETV
}

const categoryOptions: ICategoryOption[] = [
  { value: 'movie', label: 'Фильмы' },
  { value: 'tv', label: 'Сериалы' },
]

interface ISortOption extends IOption {
  value: MovieSort | 'notchosen'
}
const sortOptions: ISortOption[] = [
  { value: 'notchosen', label: 'не сортировать' },
  { value: 'popularity.desc', label: 'сначала популярние' },
  { value: 'popularity.asc', label: 'сначала не популярности' },
  { value: 'revenue.desc', label: 'большие сборы' },
  { value: 'revenue.asc', label: 'малые сборы' },
  { value: 'primary_release_date.desc', label: 'сначала новые' },
  { value: 'primary_release_date.asc', label: 'сначала старые' },
]

export const SearchResult = () => {
  const [category, setCategory] = useState<ICategoryOption>(categoryOptions[0])
  const [sortValue, setSortValue] = useState<ISortOption | null>(null)
  const ref = useRef<HTMLInputElement>(null)
  const [pagesData, setPagesData] = useState<Omit<IDiscoverResult, 'results'> | null>(null)
  const [films, setFilms] = useState<IMovies>([])
  const [isLoading, setIsLoading] = useState(true)

  const handleSelect = (selectedOptions: unknown) => setSortValue(selectedOptions as ISortOption)
  const handleSelectCategory = (selectedOptions: unknown) => setCategory(selectedOptions as ICategoryOption)

  const search = async (page: number = 1) => {
    setIsLoading(true)
    const params: IParams = { page }
    if (sortValue && sortValue.value !== 'notchosen') params.sort_by = sortValue.value
    if (ref.current) params.with_keywords = ref.current.value

    const data = await MovieDBAPI.getSearch({
      type: category.value,
      params,
    })

    if (!data) return
    const { results, ...rest } = data
    setFilms(results)
    setPagesData(rest)
    setIsLoading(false)
  }
  const onSearch = async () => search()
  const onPaginationChange = async (page: number) => {
    search(page)
    scrollTop()
  }

  useEffect(() => {
    search()
  }, [category, sortValue])

  if (isLoading) return <SearchResultSkeleton />

  return (
    <section className={'container'}>
      <SearchBar className={'mt-4 mb-2'} ref={ref} onSearch={onSearch} />
      <div className={'md:flex'}>
        <div className={'md:basis-2/3'}>
          <Typography variant={'h1'} type={TypographyTypes._TITLE}>
            Результаты поиска
          </Typography>
          <h3 className={'text-15 font-q-600 md:text-xl 2xl:text-3xl'}>
            {ref.current?.value} ({pagesData?.total_results ? pagesData.total_results : 0} результатов)
          </h3>
          <p className={'text-sm font-q-600 md:text-17 2xl:text-2xl'}>{category.label}:</p>
        </div>
        <div className={'md:basis-1/3'}>
          <CustomSelect
            options={categoryOptions}
            value={category}
            onChange={handleSelectCategory}
            isClearable={false}
          />
          <CustomSelect options={sortOptions} value={sortValue} onChange={handleSelect} placeholder={'Отсортировать'} />
        </div>
      </div>

      <ResultList list={films} />
      {pagesData?.page && pagesData?.total_pages > 1 && (
        <Pagination
          totalCount={pagesData?.total_pages || 0}
          currentPage={pagesData?.page}
          siblingCount={pagesData?.total_pages >= 5 ? 2 : undefined}
          pageSize={MovieDBPageSize}
          onPageChange={(pageNum: number) => onPaginationChange(pageNum)}
          className={'mx-auto mt-4 md:mt-8 ld:mt-9 2xl:mt-11'}
        />
      )}
    </section>
  )
}
