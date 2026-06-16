import { Skeleton } from '../../../components/ui/Skeleton/Skeleton'

const ITEMS = 8

export const FilmCastSkeleton = () => (
  <div className={'grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-2.5 lg:grid-cols-6 xl:grid-cols-8'}>
    {Array.from({ length: ITEMS }).map((_, i) => (
      <Skeleton key={i} className={'w-full aspect-[2/3] rounded-10'} />
    ))}
  </div>
)
