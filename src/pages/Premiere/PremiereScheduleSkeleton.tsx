import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const GROUPS = 2
const FILMS_PER_GROUP = 4

export const PremiereScheduleSkeleton = () => (
  <>
    {Array.from({ length: GROUPS }).map((_, gi) => (
      <section key={gi} className={'container mt-7 md:mt-10 2xl:mt-16'}>
        <Skeleton className={'h-7 w-40 rounded-5 mb-4 md:mb-5'} />
        <div
          className={
            'grid grid-cols-2 gap-[8.8px] mt-4 md:grid-cols-3 md:gap-[10.12px] md:mt-5 lg:grid-cols-4 lg:gap-x-[1.17%] lg:gap-y-5 2xl:gap-[22.84px]'
          }
        >
          {Array.from({ length: FILMS_PER_GROUP }).map((_, fi) => (
            <div key={fi}>
              <Skeleton className={'aspect-card-sm rounded-lg'} />
              <Skeleton className={'h-4 w-3/4 rounded-5 mt-2'} />
              <Skeleton className={'h-3 w-1/2 rounded-5 mt-1'} />
            </div>
          ))}
        </div>
      </section>
    ))}
  </>
)
