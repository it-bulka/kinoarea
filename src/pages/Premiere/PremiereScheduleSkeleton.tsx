import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const GROUPS = 2
const FILMS_PER_GROUP = 6

export const PremiereScheduleSkeleton = () => (
  <div className={'container xl:flex xl:items-start xl:gap-8'}>
    <div className={'xl:flex-1 min-w-0'}>
      {Array.from({ length: GROUPS }).map((_, gi) => (
        <section key={gi} className={'mt-7 md:mt-10 2xl:mt-16'}>
          <div className={'flex items-center gap-3 mb-1'}>
            <div className={'w-1 h-6 bg-white/10 rounded-full flex-shrink-0'} />
            <Skeleton className={'h-6 w-40 rounded-5'} />
          </div>
          <div
            className={
              'grid grid-cols-3 gap-[8.8px] mt-4 md:grid-cols-4 md:gap-[10.12px] md:mt-5 lg:grid-cols-5 lg:gap-x-[1.17%] lg:gap-y-5 2xl:grid-cols-6 2xl:gap-[22.84px]'
            }
          >
            {Array.from({ length: FILMS_PER_GROUP }).map((_, fi) => (
              <div key={fi}>
                <Skeleton className={'aspect-card-sm rounded-lg'} />
                <Skeleton className={'h-5 w-3/4 rounded-5 mt-1 2xl:h-6 2xl:mt-2 2xl:mb-2'} />
                <Skeleton className={'h-3 w-1/2 rounded-5 mt-0.5 2xl:h-4'} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>

    <aside className={'hidden xl:block xl:w-[280px] xl:flex-shrink-0 xl:mt-7'}>
      <Skeleton className={'h-7 w-40 rounded-5 mb-4 pb-3'} />
      <div className={'flex flex-col gap-3'}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={'flex gap-3 p-2.5 rounded-lg bg-noir-card'}>
            <Skeleton className={'w-14 h-20 rounded-md flex-shrink-0'} />
            <div className={'flex-1 flex flex-col justify-between py-0.5'}>
              <Skeleton className={'h-4 w-full rounded-5'} />
              <Skeleton className={'h-3 w-16 rounded-5'} />
            </div>
          </div>
        ))}
      </div>
    </aside>
  </div>
)
