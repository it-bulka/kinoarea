import { Skeleton } from '../../../components/ui/Skeleton/Skeleton'

export const FilmPostersSkeleton = () => (
  <div className={'grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-1.5 lg:gap-2 2xl:gap-[22px]'}>
    {Array.from({ length: 4 }).map((_, i) => (
      <Skeleton key={i} className={'w-full aspect-[230/310] rounded-10'} />
    ))}
  </div>
)
