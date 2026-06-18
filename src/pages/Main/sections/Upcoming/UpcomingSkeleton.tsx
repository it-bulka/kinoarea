import { Skeleton } from '../../../../components/ui/Skeleton/Skeleton'

const SLIDES = 5

export const UpcomingSkeleton = () => (
  <section className={'container pt-[17px] lg:pt-8 2xl:pt-[49px] 2xl:pb-[105px]'}>
    <div className={'flex-between my-2'}>
      <Skeleton className={'h-7 w-48 rounded-5'} />
      <Skeleton className={'h-8 w-24 rounded-5 hidden md:block'} />
    </div>
    <div className={'flex gap-3 overflow-hidden'}>
      {Array.from({ length: SLIDES }).map((_, i) => (
        <Skeleton key={i} className={'flex-shrink-0 w-[45%] md:w-[30%] lg:w-[22%] aspect-card-sm rounded-10'} />
      ))}
    </div>
    <div className={'flex-center mt-7'}>
      <Skeleton className={'h-8 w-24 rounded-5 md:hidden'} />
    </div>
  </section>
)
