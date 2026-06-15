import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const ITEMS = 8

const ActorItemSkeleton = () => (
  <div className="flex items-center gap-4 lg:gap-7 py-4 md:py-5 border-b border-white/[0.05] rounded-lg">
    <div className="hidden lg:block w-9 flex-shrink-0" />
    <Skeleton className="w-[104px] h-[148px] md:w-[120px] md:h-[171px] rounded-2xl flex-shrink-0" />
    <div className="flex-1 flex flex-col gap-2.5">
      <Skeleton className="h-3 w-16 rounded-full" />
      <Skeleton className="h-7 w-1/2 rounded-5" />
      <div className="flex gap-1.5 mt-1">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
    <div className="flex items-center gap-5 flex-shrink-0">
      <div className="flex flex-col items-center gap-1.5">
        <Skeleton className="h-8 w-10 rounded-5" />
        <Skeleton className="h-2.5 w-14 rounded-full" />
      </div>
      <Skeleton className="hidden md:block h-9 w-32 rounded-full" />
    </div>
  </div>
)

export const ActorsSkeleton = () => (
  <section className="container pb-9 lg:pb-10 2xl:pb-[70px]">
    <div className="pt-4 pb-5 md:pt-6 md:pb-7 mb-4 md:mb-6">
      <Skeleton className="h-9 w-28 rounded-5 mb-3" />
      <Skeleton className="h-4 w-24 rounded-5" />
    </div>
    <ul>
      {Array.from({ length: ITEMS }).map((_, i) => (
        <ActorItemSkeleton key={i} />
      ))}
    </ul>
  </section>
)
