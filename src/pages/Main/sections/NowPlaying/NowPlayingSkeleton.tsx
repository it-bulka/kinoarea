import { Skeleton } from '../../../../components/ui/Skeleton/Skeleton'

const CARDS = 6
const PILLS = 4

export const NowPlayingSkeleton = () => (
  <section>
    <div className={'flex-between mb-4 md:mb-6 2xl:mb-8'}>
      <Skeleton className={'h-7 w-40 rounded-5'} />
      <div className={'flex gap-2'}>
        {Array.from({ length: PILLS }).map((_, i) => (
          <Skeleton key={i} className={'h-6 w-14 rounded-full'} />
        ))}
      </div>
    </div>
    <div className={'grid card-2 md:card-3 lg:card-3 gap-3'}>
      {Array.from({ length: CARDS }).map((_, i) => (
        <Skeleton key={i} className={'w-full aspect-card-sm rounded-10'} />
      ))}
    </div>
    <Skeleton className={'h-10 w-36 rounded-5 mx-auto mt-7 mb-8'} />
  </section>
)
