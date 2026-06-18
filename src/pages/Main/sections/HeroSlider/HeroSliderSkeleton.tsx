import { Skeleton } from '../../../../components/ui/Skeleton/Skeleton'

export const HeroSliderSkeleton = () => (
  <section className="relative w-full h-[400px] md:h-[680px] md:max-h-[70vh] bg-noir overflow-hidden">
    <Skeleton className="absolute inset-0" />
    <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10 2xl:px-20 flex flex-col justify-center h-full">
      <Skeleton className="h-6 w-28 rounded-full mb-5" />
      <Skeleton className="h-12 w-72 rounded-5 mb-3" />
      <Skeleton className="h-12 w-56 rounded-5 mb-5" />
      <Skeleton className="h-4 w-64 rounded-5 mb-4" />
      <Skeleton className="h-16 w-[400px] max-w-full rounded-5 mb-6" />
      <div className="flex gap-3">
        <Skeleton className="h-[52px] w-[150px] rounded-md" />
        <Skeleton className="h-[52px] w-[150px] rounded-md" />
      </div>
    </div>
  </section>
)
