import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const CAST_ITEMS = 5

export const FilmPageSkeleton = () => (
  <div className={'container pt-[24px] pb-6 md:pt-9 md:pb-[42px] lg:pt-7 lg:pb-14'}>
    <section className={'md:flex md:flex-row-reverse md:justify-end md:gap-[17px] lg:gap-8'}>
      <div className={'flex-1'}>
        <Skeleton className={'h-4 w-32 rounded-5 mb-3'} />
        <Skeleton className={'h-9 w-3/4 rounded-5 mb-2'} />
        <Skeleton className={'h-6 w-1/2 rounded-5 mb-4'} />
        <Skeleton className={'w-[63%] md:hidden aspect-[230/310] rounded-10'} />
        <Skeleton className={'h-4 w-full rounded-5 mt-4'} />
        <Skeleton className={'h-4 w-5/6 rounded-5 mt-2'} />
        <Skeleton className={'h-4 w-4/6 rounded-5 mt-2 mb-11 md:mb-4'} />
        <Skeleton className={'h-10 w-40 rounded-5'} />
      </div>
      <Skeleton className={'hidden md:block md:max-w-[297px] w-full aspect-[230/310] rounded-10 flex-shrink-0'} />
    </section>

    <section className={'mt-8'}>
      <Skeleton className={'h-7 w-44 rounded-5 mb-4 mt-7 md:mb-8'} />
      <div className={'flex gap-3 overflow-hidden'}>
        {Array.from({ length: CAST_ITEMS }).map((_, i) => (
          <div key={i} className={'flex-shrink-0 w-[18%] flex flex-col gap-2'}>
            <Skeleton className={'w-full aspect-square rounded-full'} />
            <Skeleton className={'h-3 w-full rounded-5'} />
            <Skeleton className={'h-3 w-3/4 rounded-5'} />
          </div>
        ))}
      </div>
    </section>
  </div>
)
