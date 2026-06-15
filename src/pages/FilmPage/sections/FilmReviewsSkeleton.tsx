import { Skeleton } from '../../../components/ui/Skeleton/Skeleton'

const ITEMS = 3

export const FilmReviewsSkeleton = () => (
  <div>
    {Array.from({ length: ITEMS }).map((_, i) => (
      <div key={i} className={'rounded-10 border-[3px] border-green-800 pl-5 pr-[21px] pt-[17px] pb-10 mb-9'}>
        <div className={'flex items-center gap-3 mb-4'}>
          <Skeleton className={'w-10 h-10 rounded-full flex-shrink-0'} />
          <div className={'flex-1'}>
            <Skeleton className={'h-4 w-32 rounded-5 mb-1'} />
            <Skeleton className={'h-3 w-20 rounded-5'} />
          </div>
        </div>
        <Skeleton className={'h-4 w-full rounded-5 mb-2'} />
        <Skeleton className={'h-4 w-5/6 rounded-5 mb-2'} />
        <Skeleton className={'h-4 w-3/4 rounded-5'} />
      </div>
    ))}
  </div>
)
