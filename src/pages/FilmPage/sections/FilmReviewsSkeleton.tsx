import { Skeleton } from '../../../components/ui/Skeleton/Skeleton'

const ITEMS = 3

export const FilmReviewsSkeleton = () => (
  <div>
    {Array.from({ length: ITEMS }).map((_, i) => (
      <div key={i} className={'rounded-10 border border-noir-border px-4 pt-3 pb-4 mb-4'}>
        <div className={'flex items-center gap-3 mb-2'}>
          <Skeleton className={'w-9 h-9 rounded-full flex-shrink-0'} />
          <div className={'flex-1'}>
            <Skeleton className={'h-3.5 w-28 rounded-5 mb-1'} />
            <Skeleton className={'h-3 w-16 rounded-5'} />
          </div>
        </div>
        <Skeleton className={'h-3.5 w-full rounded-5 mb-1.5'} />
        <Skeleton className={'h-3.5 w-5/6 rounded-5 mb-1.5'} />
        <Skeleton className={'h-3.5 w-3/4 rounded-5'} />
      </div>
    ))}
  </div>
)
