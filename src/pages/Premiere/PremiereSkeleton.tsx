import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const SCHEDULE_ROWS = 3

export const PremiereSkeleton = () => (
  <div className={'py-6'}>
    <section className={'container'}>
      <Skeleton className={'h-9 w-72 rounded-5 mx-auto md:mx-0 mb-2'} />
      <Skeleton className={'h-4 w-24 rounded-5 mx-auto md:mx-0 mb-4'} />
      <Skeleton className={'h-16 w-full rounded-5 mb-6'} />
      <div className={'my-[21.5px]'}>
        <Skeleton className={'h-5 w-28 rounded-5 mb-2'} />
        <div className={'flex md:w-1/2 gap-3'}>
          <Skeleton className={'h-10 flex-1 rounded-5'} />
          <Skeleton className={'h-10 flex-1 rounded-5'} />
        </div>
      </div>
      <div className={'my-[21.5px]'}>
        <Skeleton className={'h-5 w-28 rounded-5 mb-2'} />
        <Skeleton className={'h-10 w-full md:w-2/5 rounded-5'} />
      </div>
      <Skeleton className={'h-10 w-40 rounded-5 ml-auto'} />
    </section>
    <section className={'container mt-7'}>
      {Array.from({ length: SCHEDULE_ROWS }).map((_, i) => (
        <Skeleton key={i} className={'h-14 w-full rounded-5 mb-3'} />
      ))}
    </section>
  </div>
)
