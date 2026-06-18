import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const ITEMS = 12

export const FilmVideosSkeleton = () => (
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

    <div className={'grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'}>
      {Array.from({ length: ITEMS }).map((_, i) => (
        <div key={i}>
          <Skeleton className={'w-full aspect-video rounded-10'} />
          <Skeleton className={'h-3 w-3/4 mt-2 rounded-5'} />
          <Skeleton className={'h-2.5 w-1/3 mt-1 rounded-5'} />
        </div>
      ))}
    </div>
  </div>
)
