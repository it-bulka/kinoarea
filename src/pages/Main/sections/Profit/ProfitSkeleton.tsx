import { Skeleton } from '../../../../components/ui/Skeleton/Skeleton'

const ROWS = 5

export const ProfitSkeleton = () => (
  <section className={'container'}>
    <div className={'flex-between mb-4'}>
      <Skeleton className={'h-7 w-40 rounded-5'} />
    </div>
    <div className={'flex flex-wrap items-center gap-3 my-4'}>
      <Skeleton className={'h-10 flex-1 min-w-[120px] rounded-5'} />
      <Skeleton className={'h-10 flex-1 min-w-[120px] rounded-5'} />
      <Skeleton className={'h-10 w-28 rounded-5'} />
    </div>
    <div className={'flex flex-col gap-2'}>
      {Array.from({ length: ROWS }).map((_, i) => (
        <Skeleton key={i} className={'h-14 w-full rounded-5'} />
      ))}
    </div>
  </section>
)
