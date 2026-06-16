import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const ROWS = 6

export const SearchResultSkeleton = () => (
  <section className={'container py-6'}>
    <Skeleton className={'h-10 w-full rounded-10 mb-6'} />

    <div className={'flex flex-col gap-4 mb-6 md:flex-row md:items-end md:justify-between'}>
      <div className={'flex flex-col gap-2'}>
        <Skeleton className={'h-8 w-48 rounded-5'} />
        <Skeleton className={'h-4 w-36 rounded-5'} />
      </div>
      <div className={'flex gap-3'}>
        <Skeleton className={'h-9 w-[140px] rounded-10'} />
        <Skeleton className={'h-9 w-[190px] rounded-10'} />
      </div>
    </div>

    <div className={'flex flex-col gap-3'}>
      {Array.from({ length: ROWS }).map((_, i) => (
        <div key={i} className={'bg-noir-card rounded-10 p-3 flex gap-3'}>
          <Skeleton className={'w-20 h-[115px] md:w-[100px] md:h-[144px] rounded-lg flex-shrink-0'} />
          <div className={'flex-1 flex flex-col gap-2 pt-1'}>
            <Skeleton className={'h-5 w-3/5 rounded-5'} />
            <Skeleton className={'h-3.5 w-2/5 rounded-5'} />
            <Skeleton className={'h-3.5 w-full rounded-5'} />
            <Skeleton className={'h-3.5 w-4/5 rounded-5'} />
          </div>
        </div>
      ))}
    </div>
  </section>
)
