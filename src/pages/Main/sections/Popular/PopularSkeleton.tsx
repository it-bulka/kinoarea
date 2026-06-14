import { Skeleton } from '../../../../components/ui/Skeleton/Skeleton'

const SLIDES = 5
const PILLS = 3

export const PopularSkeleton = () => (
  <section>
    <div className={'flex-between mb-4 md:mb-6 2xl:mb-8'}>
      <Skeleton className={'h-7 w-48 rounded-5'} />
      <div className={'flex gap-2'}>
        {Array.from({ length: PILLS }).map((_, i) => (
          <Skeleton key={i} className={'h-6 w-14 rounded-full'} />
        ))}
      </div>
    </div>
    <div className={'flex gap-3 overflow-hidden'}>
      {Array.from({ length: SLIDES }).map((_, i) => (
        <Skeleton key={i} className={'flex-shrink-0 w-[45%] md:w-[30%] lg:w-[22%] aspect-card-sm rounded-10'} />
      ))}
    </div>
    <Skeleton className={'h-8 w-24 rounded-5 mx-auto mt-8'} />
  </section>
)
