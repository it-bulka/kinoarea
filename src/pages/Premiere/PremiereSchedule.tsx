import { memo } from 'react'
import { Schedule } from '../../components/Schedule/Schedule'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import { MovieDBPageSize } from '../../api/types/responses'
import { getDate } from '../../utils'
import { PremiereScheduleSkeleton } from './PremiereScheduleSkeleton'
import { PremiereSidebar } from './PremiereSidebar'
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
      <div className={'container xl:flex xl:items-start xl:gap-8'}>
        <div className={'xl:flex-1 min-w-0'}>
          {schedule?.map(([date, films]) => (
            <section key={date} className={'mt-7 md:mt-10 2xl:mt-16'}>
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
        </div>

        <aside className={'hidden xl:block xl:w-[280px] xl:flex-shrink-0 xl:sticky xl:top-6 xl:mt-7'}>
          <PremiereSidebar schedule={schedule} />
        </aside>
      </div>
    )
  }
)
