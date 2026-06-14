import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const ITEMS = 6

export const NewsSkeleton = () => (
  <section className={'container pt-6 pb-8'}>
    <Skeleton className={'h-9 w-32 rounded-5 mb-2'} />
    <Skeleton className={'h-4 w-24 rounded-5 mb-6'} />
    <div
      className={`
        grid grid-cols-1 gap-1.5 mt-6
        md:grid-cols-2 md:gap-x-[23.83px] md:gap-y-[18.3px]
        lg:grid-cols-3 lg:gap-x-5 lg:gap-y-[20.6px]
      `}
    >
      {Array.from({ length: ITEMS }).map((_, i) => (
        <Skeleton key={i} className={'h-48 w-full rounded-10'} />
      ))}
    </div>
  </section>
)
