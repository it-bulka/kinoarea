import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const ITEMS = 8

export const ActorsSkeleton = () => (
  <section className={'container'}>
    <Skeleton className={'h-9 w-24 rounded-5 mb-6'} />
    <div className={'flex flex-col gap-4'}>
      {Array.from({ length: ITEMS }).map((_, i) => (
        <div key={i} className={'flex gap-4 items-center'}>
          <Skeleton className={'w-[144px] h-[205px] rounded-10 flex-shrink-0'} />
          <div className={'flex-1 flex flex-col gap-2'}>
            <Skeleton className={'h-6 w-1/3 rounded-5'} />
            <Skeleton className={'h-4 w-1/4 rounded-5'} />
            <Skeleton className={'h-4 w-2/3 rounded-5'} />
          </div>
        </div>
      ))}
    </div>
  </section>
)
