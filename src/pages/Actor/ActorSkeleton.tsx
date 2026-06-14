import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const FILM_ROWS = 5

export const ActorSkeleton = () => (
  <div className={'container'}>
    <section className={'md:flex md:flex-row-reverse md:gap-8'}>
      <div className={'flex-1'}>
        <Skeleton className={'h-4 w-32 rounded-5 mb-3'} />
        <Skeleton className={'h-9 w-48 rounded-5 mb-4'} />
        <Skeleton className={'w-[63%] md:hidden aspect-[230/310] rounded-10 mb-4'} />
        <Skeleton className={'h-4 w-full rounded-5'} />
        <Skeleton className={'h-4 w-5/6 rounded-5 mt-2'} />
        <Skeleton className={'h-4 w-4/6 rounded-5 mt-2'} />
        <Skeleton className={'h-4 w-3/4 rounded-5 mt-2'} />
        <div className={'mt-4 flex flex-col gap-2'}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className={'h-5 w-1/2 rounded-5'} />
          ))}
        </div>
      </div>
      <Skeleton className={'hidden md:block md:max-w-[297px] w-full aspect-[230/310] rounded-10 flex-shrink-0'} />
    </section>

    <section className={'mt-8'}>
      <Skeleton className={'h-7 w-24 rounded-5 mb-4'} />
      <div className={'flex flex-col gap-3'}>
        {Array.from({ length: FILM_ROWS }).map((_, i) => (
          <Skeleton key={i} className={'h-12 w-full rounded-5'} />
        ))}
      </div>
    </section>
  </div>
)
