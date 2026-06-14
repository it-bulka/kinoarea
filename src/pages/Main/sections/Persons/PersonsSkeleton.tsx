import { Skeleton } from '../../../../components/ui/Skeleton/Skeleton'

const BIG_SLIDES = 2
const RATING_ROWS = 4

export const PersonsSkeleton = () => (
  <section>
    <div className={'flex-between mb-4'}>
      <Skeleton className={'h-7 w-48 rounded-5'} />
      <Skeleton className={'h-8 w-16 rounded-5'} />
    </div>
    <div className={'lg:grid lg:grid-cols-3 lg:gap-[1.317%]'}>
      <div className={'lg:col-span-2 flex gap-3 overflow-hidden'}>
        {Array.from({ length: BIG_SLIDES }).map((_, i) => (
          <Skeleton key={i} className={'flex-shrink-0 w-full md:w-1/2 aspect-[3/4] rounded-10'} />
        ))}
      </div>
      <div className={'hidden lg:flex lg:flex-col gap-3'}>
        {Array.from({ length: RATING_ROWS }).map((_, i) => (
          <div key={i} className={'flex items-center gap-3'}>
            <Skeleton className={'w-10 h-10 rounded-full flex-shrink-0'} />
            <div className={'flex-1 flex flex-col gap-1'}>
              <Skeleton className={'h-4 w-3/4 rounded-5'} />
              <Skeleton className={'h-3 w-1/2 rounded-5'} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)
