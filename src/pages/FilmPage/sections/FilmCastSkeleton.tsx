import { Skeleton } from '../../../components/ui/Skeleton/Skeleton'

const ITEMS = 8

export const FilmCastSkeleton = () => (
  <div className={'grid grid-cols-2 gap-x-[8.9%] gap-y-5 md:gap-y-[62px] lg:grid-cols-3 lg:gap-x-12 2xl:grid-cols-5'}>
    {Array.from({ length: ITEMS }).map((_, i) => (
      <div key={i}>
        <Skeleton className={'w-full aspect-square rounded-[5px] mb-1.5 md:mb-4'} />
        <Skeleton className={'h-4 w-3/4 rounded-5 mb-[3px]'} />
        <Skeleton className={'h-3 w-1/2 rounded-5 mb-[3px]'} />
        <Skeleton className={'h-3 w-2/3 rounded-5'} />
      </div>
    ))}
  </div>
)
