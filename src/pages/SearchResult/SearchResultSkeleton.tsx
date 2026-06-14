import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const ROWS = 6

export const SearchResultSkeleton = () => (
  <section className={'container'}>
    <Skeleton className={'h-10 w-full rounded-5 mt-4 mb-2'} />
    <div className={'md:flex gap-4 mb-6'}>
      <div className={'md:basis-2/3'}>
        <Skeleton className={'h-8 w-40 rounded-5 mb-2'} />
        <Skeleton className={'h-6 w-56 rounded-5 mb-1'} />
        <Skeleton className={'h-5 w-20 rounded-5'} />
      </div>
      <div className={'md:basis-1/3 flex flex-col gap-2 mt-2 md:mt-0'}>
        <Skeleton className={'h-10 w-full rounded-5'} />
        <Skeleton className={'h-10 w-full rounded-5'} />
      </div>
    </div>
    <div className={'flex flex-col gap-3'}>
      {Array.from({ length: ROWS }).map((_, i) => (
        <div key={i} className={'flex gap-4'}>
          <Skeleton className={'w-[100px] h-[144px] rounded-10 flex-shrink-0'} />
          <div className={'flex-1 flex flex-col gap-2 pt-2'}>
            <Skeleton className={'h-5 w-1/2 rounded-5'} />
            <Skeleton className={'h-4 w-1/3 rounded-5'} />
            <Skeleton className={'h-4 w-full rounded-5'} />
            <Skeleton className={'h-4 w-4/5 rounded-5'} />
          </div>
        </div>
      ))}
    </div>
  </section>
)
