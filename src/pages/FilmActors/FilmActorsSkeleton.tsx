import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const ITEMS = 6

export const FilmActorsSkeleton = () => (
  <div className={'container pt-6 pb-12 md:pt-9 md:pb-14 lg:pt-7'}>
    {/* Hero skeleton */}
    <Skeleton className={'h-8 w-48 mb-2 rounded-5'} />
    <Skeleton className={'h-4 w-24 mb-8 rounded-5'} />

    {/* Film back-link skeleton */}
    <div className={'flex items-center gap-3 mb-8'}>
      <Skeleton className={'w-12 h-[68px] rounded-lg flex-shrink-0'} />
      <div>
        <Skeleton className={'h-3 w-24 mb-1.5 rounded-5'} />
        <Skeleton className={'h-5 w-40 rounded-5'} />
      </div>
    </div>

    {/* Cast rows */}
    {Array.from({ length: ITEMS }).map((_, i) => (
      <div key={i} className={'flex items-center gap-4 py-4 border-b border-noir-border'}>
        <Skeleton className={'w-[88px] h-[126px] md:w-[120px] md:h-[171px] rounded-xl flex-shrink-0'} />
        <div className={'flex-1'}>
          <Skeleton className={'h-3 w-16 mb-2 rounded-5'} />
          <Skeleton className={'h-7 w-48 mb-3 rounded-5'} />
          <Skeleton className={'h-5 w-24 rounded-full'} />
        </div>
      </div>
    ))}
  </div>
)
