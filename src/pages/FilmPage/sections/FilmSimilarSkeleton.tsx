import { Skeleton } from '../../../components/ui/Skeleton/Skeleton'

export const FilmSimilarSkeleton = () => (
  <>
    <div className={'flex gap-2 overflow-hidden'}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={'flex-shrink-0 w-[calc(50%-4px)] md:w-[calc(33.33%-4px)] lg:w-[calc(25%-9px)]'}>
          <Skeleton className={'aspect-card-sm rounded-lg'} />
          <Skeleton className={'h-4 w-3/4 rounded-5 mt-2'} />
          <Skeleton className={'h-3 w-1/2 rounded-5 mt-1'} />
        </div>
      ))}
    </div>
    <div className={'flex justify-center items-center gap-4 mt-8'}>
      <Skeleton className={'w-8 h-8 rounded-full'} />
      <Skeleton className={'h-4 w-16 rounded-5'} />
      <Skeleton className={'w-8 h-8 rounded-full'} />
    </div>
  </>
)
