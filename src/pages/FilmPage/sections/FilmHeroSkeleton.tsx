import { Skeleton } from '../../../components/ui/Skeleton/Skeleton'

export const FilmHeroSkeleton = () => (
  <>
    <section className={'md:flex md:flex-row-reverse md:justify-end md:gap-[17px] lg:gap-8 2xl:gap-[54px]'}>
      <div>
        <Skeleton className={'h-4 w-32 rounded-5 mb-3'} />
        <Skeleton className={'h-9 w-3/4 rounded-5 mb-2'} />
        <Skeleton className={'h-6 w-1/2 rounded-5 mb-4'} />
        <div className={'flex'}>
          <Skeleton className={'w-[63%] aspect-[230/310] rounded-10 md:hidden'} />
          <div className={'w-[37%] flex flex-col items-center gap-2 md:hidden'}>
            <Skeleton className={'w-12 h-12 rounded-full'} />
            <Skeleton className={'h-3 w-16 rounded-5'} />
          </div>
        </div>
        <Skeleton className={'h-4 w-full rounded-5 mt-4'} />
        <Skeleton className={'h-4 w-5/6 rounded-5 mt-2'} />
        <Skeleton className={'h-4 w-4/6 rounded-5 mt-2 mb-11 md:mb-4'} />
        <Skeleton className={'h-10 w-40 rounded-5'} />
      </div>
      <div>
        <Skeleton className={'hidden md:block md:max-w-[297px] w-full aspect-[230/310] rounded-10 flex-shrink-0'} />
        <div className={'hidden md:flex gap-1 mt-2'}>
          <Skeleton className={'w-8 h-8 rounded-full'} />
          <Skeleton className={'w-8 h-8 rounded-full'} />
          <Skeleton className={'w-8 h-8 rounded-full'} />
        </div>
      </div>
    </section>

    <ul className={'mt-7 mb-9 md:mt-5 md:mb-6 lg:mt-11 lg:mb-12'}>
      {Array.from({ length: 8 }).map((_, i) => (
        <li key={i} className={'flex items-start mb-2'}>
          <Skeleton className={'h-4 basis-1/3 shrink-0 mr-3 rounded-5 sm:basis-1/5 md:basis-1/3'} />
          <Skeleton className={'h-4 w-1/2 rounded-5'} />
        </li>
      ))}
    </ul>
  </>
)
