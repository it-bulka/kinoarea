import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const CARDS = 6

export const CollectionsSkeleton = () => (
  <section className={'container pb-9 lg:pb-10'}>
    <Skeleton className={'h-9 w-48 rounded-5 mb-2'} />
    <Skeleton className={'h-4 w-32 rounded-5 mb-4'} />
    <Skeleton className={'h-4 w-24 rounded-5 mb-4'} />
    <div className={'grid card-2 md:card-3 gap-3'}>
      {Array.from({ length: CARDS }).map((_, i) => (
        <Skeleton key={i} className={'h-40 w-full rounded-10'} />
      ))}
    </div>
  </section>
)
