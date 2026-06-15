import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import { NewsListSkeleton } from './NewsSkeleton'
import { NewsFilmGrid } from './NewsFilmGrid'
import { useNewsFilms, NewsTab } from './hooks/useNewsFilms'

export type { NewsTab }

interface NewsFilmListProps {
  activeTab: NewsTab
}

export const NewsFilmList = ({ activeTab }: NewsFilmListProps) => {
  const navigate = useNavigate()
  const { films, pagesData, isLoading, currentPage, onPageChange, pageSize } = useNewsFilms(activeTab)

  const onFilmClick = useCallback((id: number) => navigate(`/films/${id}`), [navigate])

  if (isLoading) return <NewsListSkeleton />

  return (
    <>
      <NewsFilmGrid films={films} onFilmClick={onFilmClick} />
      {pagesData && pagesData.total_pages > 1 && (
        <Pagination
          totalCount={pagesData.total_pages}
          currentPage={currentPage}
          siblingCount={2}
          pageSize={pageSize}
          onPageChange={onPageChange}
          className="mx-auto mt-5 sm:mt-[30px] md:mt-10 lg:mt-14 2xl:mt-[71px]"
        />
      )}
    </>
  )
}
