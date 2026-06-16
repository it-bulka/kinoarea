import { Skeleton } from '../../components/ui/Skeleton/Skeleton'
import { ResultList } from '../../components/ui/ResultList/ResultList'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import type { IDiscoverResult } from '../../api/types/responses'
import type { IMovies } from '../../api/types'

const SKELETON_ROWS = 6

const SearchResultListSkeleton = () => (
  <div className={'flex flex-col gap-3'}>
    {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
      <div key={i} className={'bg-noir-card rounded-10 p-3 flex gap-3'}>
        <Skeleton className={'w-20 h-[115px] md:w-[100px] md:h-[144px] rounded-lg flex-shrink-0'} />
        <div className={'flex-1 flex flex-col gap-2 pt-1'}>
          <Skeleton className={'h-5 w-3/5 rounded-5'} />
          <Skeleton className={'h-3.5 w-2/5 rounded-5'} />
          <Skeleton className={'h-3.5 w-full rounded-5'} />
          <Skeleton className={'h-3.5 w-4/5 rounded-5'} />
        </div>
      </div>
    ))}
  </div>
)

interface SearchResultListProps {
  films: IMovies
  pagesData: Omit<IDiscoverResult, 'results'> | null
  isLoading: boolean
  currentPage: number
  pageSize: number
  onPageChange: (page: number) => void
}

export const SearchResultList = ({
  films,
  pagesData,
  isLoading,
  currentPage,
  pageSize,
  onPageChange,
}: SearchResultListProps) => {
  if (isLoading) return <SearchResultListSkeleton />

  return (
    <>
      <ResultList list={films} />
      {pagesData && pagesData.total_pages > 1 && (
        <Pagination
          totalCount={pagesData.total_pages}
          currentPage={currentPage}
          siblingCount={pagesData.total_pages >= 5 ? 2 : undefined}
          pageSize={pageSize}
          onPageChange={onPageChange}
          className={'mx-auto mt-4 md:mt-8 lg:mt-9 2xl:mt-11'}
        />
      )}
    </>
  )
}
