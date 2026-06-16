import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomSelect } from '../../components/ui/Select/Select'
import type { MovieSort, MOVIETV } from '../../api/types/requests'

interface SearchResultFiltersProps {
  categoryValue: MOVIETV
  sortValue: MovieSort | 'notchosen' | null
  onCategoryChange: (opt: unknown) => void
  onSortChange: (opt: unknown) => void
}

export const SearchResultFilters = ({
  categoryValue,
  sortValue,
  onCategoryChange,
  onSortChange,
}: SearchResultFiltersProps) => {
  const { t } = useTranslation()

  const categoryOptions = useMemo(
    () => [
      { value: 'movie' as MOVIETV, label: t('search.category.movie') },
      { value: 'tv' as MOVIETV, label: t('search.category.tv') },
    ],
    [t]
  )

  const sortOptions = useMemo(
    () => [
      { value: 'notchosen' as const, label: t('search.sort.none') },
      { value: 'popularity.desc' as MovieSort, label: t('search.sort.popularDesc') },
      { value: 'popularity.asc' as MovieSort, label: t('search.sort.popularAsc') },
      { value: 'revenue.desc' as MovieSort, label: t('search.sort.revenueDesc') },
      { value: 'revenue.asc' as MovieSort, label: t('search.sort.revenueAsc') },
      { value: 'primary_release_date.desc' as MovieSort, label: t('search.sort.newestFirst') },
      { value: 'primary_release_date.asc' as MovieSort, label: t('search.sort.oldestFirst') },
    ],
    [t]
  )

  const selectedCategory = categoryOptions.find(o => o.value === categoryValue) ?? categoryOptions[0]
  const selectedSort = sortOptions.find(o => o.value === sortValue) ?? null

  return (
    <div className={'flex flex-col gap-2 md:flex-row md:gap-3'}>
      <div className={'w-full md:w-[140px]'}>
        <CustomSelect
          options={categoryOptions}
          value={selectedCategory}
          onChange={onCategoryChange}
          isClearable={false}
        />
      </div>
      <div className={'w-full md:w-[190px]'}>
        <CustomSelect
          options={sortOptions}
          value={selectedSort}
          onChange={onSortChange}
          placeholder={t('search.sortPlaceholder')}
        />
      </div>
    </div>
  )
}
