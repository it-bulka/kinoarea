import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const ITEMS = 6

const MovieItemSkeleton = () => (
  <li className={'pt-[14px] pb-5 flex items-center gap-5 item-border'}>
    <Skeleton className={'rounded-10 w-[144px] h-[205px] flex-shrink-0 xl:w-[150px] xl:h-[214px]'} />
    <div className={'flex-1 gap-1 md:flex md:items-center md:justify-between lg:gap-[25px]'}>
      <div className={'lg:flex-1 lg:flex lg:items-center lg:justify-between'}>
        <div className={'flex flex-col gap-2 lg:flex-1'}>
          <Skeleton className={'h-5 w-3/4 rounded-5'} />
          <Skeleton className={'h-4 w-1/2 rounded-5'} />
          <Skeleton className={'h-4 w-1/3 rounded-5'} />
          <Skeleton className={'h-4 w-full rounded-5'} />
          <Skeleton className={'h-4 w-4/5 rounded-5'} />
        </div>
        <div className={'flex gap-3 mt-4 lg:mt-0 lg:pt-5'}>
          <div className={'flex flex-col gap-1'}>
            <Skeleton className={'h-8 w-12 rounded-5'} />
            <Skeleton className={'h-4 w-12 rounded-5'} />
          </div>
          <div className={'flex flex-col gap-1'}>
            <Skeleton className={'h-8 w-12 rounded-5'} />
            <Skeleton className={'h-4 w-12 rounded-5'} />
          </div>
        </div>
      </div>
      <Skeleton className={'h-10 w-32 rounded-5 hidden md:block'} />
    </div>
  </li>
)

export const NewsListSkeleton = () => (
  <ul>
    {Array.from({ length: ITEMS }).map((_, i) => (
      <MovieItemSkeleton key={i} />
    ))}
  </ul>
)

export const NewsSkeleton = () => (
  <section className={'container pt-6 pb-8 md:pb-10 lg:pb-9 2xl:pb-[71px]'}>
    <Skeleton className={'h-4 w-24 rounded-5 mx-auto mb-2 md:ml-0'} />
    <div className={'mt-5 mb-[30px] xl:flex xl:justify-between xl:items-center'}>
      <Skeleton className={'h-8 w-20 rounded-5 mx-auto mb-5 md:ml-0'} />
      <div className={'flex gap-4 mt-4 xl:mt-0'}>
        <Skeleton className={'h-7 w-36 rounded-full'} />
        <Skeleton className={'h-7 w-40 rounded-full'} />
      </div>
    </div>
    <NewsListSkeleton />
  </section>
)
