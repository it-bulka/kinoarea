import { memo } from 'react'
import { Schedule } from '../../components/Schedule/Schedule'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import { MovieDBPageSize } from '../../api/types/responses'
import { getDate } from '../../utils'
import { PremiereScheduleSkeleton } from './PremiereScheduleSkeleton'
import type { MovieSchedule, PageInfo } from './types'

interface PremiereScheduleProps {
  schedule: MovieSchedule | null
  pagesData: PageInfo | null
  currentPage: number
  isLoading: boolean
  onPageChange: (page: number) => void
}

// eslint-disable-next-line react/display-name
export const PremiereSchedule = memo(
  ({ schedule, pagesData, currentPage, isLoading, onPageChange }: PremiereScheduleProps) => {
    if (isLoading) return <PremiereScheduleSkeleton />

    return (
      <>
        {schedule?.map(([date, films]) => (
          <section key={date} className={'container mt-7 md:mt-10 2xl:mt-16'}>
            <Schedule period={getDate(date)} films={films} />
          </section>
        ))}

        {pagesData && pagesData.total_pages > 1 && (
          <Pagination
            totalCount={pagesData.total_pages}
            currentPage={currentPage}
            siblingCount={pagesData.total_pages >= 5 ? 2 : undefined}
            pageSize={MovieDBPageSize}
            onPageChange={onPageChange}
            className={'mx-auto mt-4 md:mt-8 ld:mt-9 2xl:mt-11'}
          />
        )}
      </>
    )
  }
)
