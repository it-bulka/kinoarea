import { useTranslation } from 'react-i18next'
import { Typography, TypographyTypes } from '../../components/ui/Typography/Typography'
import { SearchBar } from '../../components/ui/SearchBar/SearchBar'
import { useSearchFilms } from './hooks/useSearchFilms'
import { SearchResultFilters } from './SearchResultFilters'
import { SearchResultList } from './SearchResultList'

export const SearchResult = () => {
  const { t } = useTranslation()
  const {
    films,
    pagesData,
    isLoading,
    currentPage,
    pageSize,
    categoryValue,
    sortValue,
    searchRef,
    handleSearch,
    handleCategoryChange,
    handleSortChange,
    handlePageChange,
  } = useSearchFilms()

  return (
    <section className={'container py-6'}>
      <SearchBar ref={searchRef} onChange={handleSearch} className={'mb-6'} />

      <div className={'flex flex-col gap-4 mb-6 md:flex-row md:items-end md:justify-between'}>
        <div>
          <Typography variant={'h1'} type={TypographyTypes._TITLE}>
            {t('search.title')}
          </Typography>
          <p className={'text-sm font-inter text-text-muted mt-1'}>
            {t('search.results', { count: pagesData?.total_results ?? 0 })}
          </p>
        </div>
        <SearchResultFilters
          categoryValue={categoryValue}
          sortValue={sortValue}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
        />
      </div>

      <SearchResultList
        films={films}
        pagesData={pagesData}
        isLoading={isLoading}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </section>
  )
}
