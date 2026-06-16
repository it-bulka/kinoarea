import { Skeleton } from '../../../components/ui/Skeleton/Skeleton'

export const FilmPostersSkeleton = () => (
  <div className={'grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-2.5 xl:grid-cols-5 xl:gap-3'}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Skeleton key={i} className={'w-full aspect-[230/310] rounded-10'} />
    ))}
  </div>
)
