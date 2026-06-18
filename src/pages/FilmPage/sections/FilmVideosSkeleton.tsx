import { Skeleton } from '../../../components/ui/Skeleton/Skeleton'

const ITEMS = 8

export const FilmVideosSkeleton = () => (
  <div className={'grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'}>
    {Array.from({ length: ITEMS }).map((_, i) => (
      <Skeleton key={i} className={'w-full aspect-video rounded-10'} />
    ))}
  </div>
)
