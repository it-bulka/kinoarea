import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const CARDS = 8
const TAGS = 5

export const CollectionsSkeleton = () => (
  <section className={'container pb-9 lg:pb-10 2xl:pb-[70px]'}>
    <div className="relative pt-4 pb-5 md:pt-6 md:pb-7 mb-4 md:mb-6">
      <Skeleton className={'h-9 w-56 rounded-5 md:h-10'} />
      <Skeleton className={'h-3 w-44 rounded-5 mt-2'} />
      <Skeleton className={'h-4 w-64 rounded-5 mt-2 md:h-5'} />
    </div>

    <div className="flex-center flex-wrap gap-2 md:gap-3 mb-6">
      {Array.from({ length: TAGS }).map((_, i) => (
        <Skeleton key={i} className={'h-8 w-20 rounded-full md:h-9 md:w-24 2xl:h-10 2xl:w-28'} />
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mt-6 mb-8 md:mt-8 md:mb-10 2xl:mt-12 2xl:mb-[60px]">
      {Array.from({ length: CARDS }).map((_, i) => (
        <Skeleton key={i} className={'aspect-[4/3] rounded-xl'} />
      ))}
    </div>

    <Skeleton className={'h-10 w-64 rounded-5 mx-auto'} />
  </section>
)
