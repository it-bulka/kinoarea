import { Skeleton } from '../../../../components/ui/Skeleton/Skeleton'

export const NewTrailersSkeleton = () => (
  <section>
    <Skeleton className={'h-7 w-44 rounded-5 mb-4 mt-7 md:mb-8 2xl:mb-20'} />
    <Skeleton className={'w-full aspect-[368/198.87] rounded-lg'} />
    <div className={'flex justify-between mt-4 mb-4 md:mb-6'}>
      <Skeleton className={'h-6 w-40 rounded-5'} />
    </div>
  </section>
)
