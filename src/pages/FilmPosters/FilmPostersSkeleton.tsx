import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const ITEMS = 10

export const FilmPostersSkeleton = () => (
  <div className={'container pt-6 pb-12 md:pt-9 md:pb-14 lg:pt-7'}>
    <Skeleton className={'h-8 w-52 mb-2 rounded-5'} />
    <Skeleton className={'h-4 w-28 mb-8 rounded-5'} />

    <div className={'flex items-center gap-3 mb-8'}>
      <Skeleton className={'w-12 h-[68px] rounded-lg flex-shrink-0'} />
      <div>
        <Skeleton className={'h-3 w-24 mb-1.5 rounded-5'} />
        <Skeleton className={'h-5 w-40 rounded-5'} />
      </div>
    </div>

    <div className={'grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-4'}>
      {Array.from({ length: ITEMS }).map((_, i) => (
        <Skeleton key={i} className={'w-full aspect-[2/3] rounded-10'} />
      ))}
    </div>
  </div>
)
