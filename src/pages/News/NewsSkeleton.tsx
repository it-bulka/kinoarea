import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const GRID_ITEMS = 10

const FilmCardSkeleton = () => (
  <div className="relative rounded-xl overflow-hidden bg-noir-card aspect-[2/3]">
    <Skeleton className="absolute inset-0 w-full h-full" />
  </div>
)

export const NewsListSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5 mb-8 md:mb-10 2xl:mb-[60px]">
    {Array.from({ length: GRID_ITEMS }).map((_, i) => (
      <FilmCardSkeleton key={i} />
    ))}
  </div>
)

export const NewsSkeleton = () => (
  <section className="container pb-8 md:pb-10 lg:pb-9 2xl:pb-[71px]">
    <div className="relative pt-8 pb-10 md:pt-12 md:pb-14 mb-6 md:mb-10">
      <Skeleton className="h-10 w-32 rounded-5 mb-3" />
      <Skeleton className="h-4 w-24 rounded-5" />
    </div>
    <div className="flex-center gap-2 md:gap-3 mb-6">
      <Skeleton className="h-10 w-44 rounded-full" />
      <Skeleton className="h-10 w-44 rounded-full" />
    </div>
    <NewsListSkeleton />
  </section>
)
