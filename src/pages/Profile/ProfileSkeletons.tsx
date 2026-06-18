import { Skeleton } from '../../components/ui/Skeleton/Skeleton'
import cls from './Profile.module.scss'
import clsMain from './subpages/ProfileMain/ProfileMain.module.scss'
import clsFriends from './subpages/Friends/Friends.module.scss'

const TitleSkeleton = () => (
  <div className={cls.titleWrapper}>
    <Skeleton className="h-7 w-44 rounded-5 md:h-8" />
    <Skeleton className="h-4 w-20 rounded-5 mt-2 md:mt-0" />
  </div>
)

export const ProfileMainSkeleton = () => (
  <article>
    <Skeleton className="h-8 w-32 rounded-5 mb-6" />
    <div className={clsMain.contentGrid}>
      <div className={clsMain.avatarCol}>
        <Skeleton className="w-full max-w-[140px] aspect-square rounded-10 md:max-w-[160px] lg:max-w-[180px] 2xl:max-w-[220px]" />
        <div className="flex gap-2 mt-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-7 h-7 rounded-full" />
          ))}
        </div>
      </div>
      <div className="hidden lg:block" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-4 w-full rounded-5" />
        <Skeleton className="h-4 w-3/4 rounded-5" />
        <div className="flex flex-col gap-3 mt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
              <Skeleton className="h-3 w-28 rounded-5 md:w-36" />
              <Skeleton className="h-9 flex-1 rounded-5" />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden lg:block" />
      <div className="hidden lg:flex flex-col items-center gap-5 p-4">
        <Skeleton className="w-10 h-10 rounded-5" />
        <Skeleton className="h-9 w-full rounded-5" />
      </div>
    </div>
  </article>
)

const FRIENDS_COUNT = 8
export const FriendsSkeleton = () => (
  <>
    <TitleSkeleton />
    <div className={clsFriends.friends}>
      {Array.from({ length: FRIENDS_COUNT }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-square rounded-5 w-full" />
          <Skeleton className="h-4 w-3/4 rounded-5 mt-2.5 md:mt-3" />
          <Skeleton className="h-3 w-1/2 rounded-5 mt-1" />
        </div>
      ))}
    </div>
  </>
)

const FILMS_COUNT = 2
const FilmGridSkeleton = () => (
  <>
    <TitleSkeleton />
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-2.5 md:gap-3 lg:gap-4">
      {Array.from({ length: FILMS_COUNT }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-[2/3] rounded-lg" />
          <div className="flex gap-1 mt-1.5">
            <Skeleton className="w-6 h-6 rounded-full" />
          </div>
          <Skeleton className="h-3 w-3/4 rounded-5 mt-1 md:h-4" />
        </div>
      ))}
    </div>
  </>
)

export const LikesSkeleton = FilmGridSkeleton
export const FavouriteFilmsSkeleton = FilmGridSkeleton

const PERSONS_COUNT = 4
export const FamousSkeleton = () => (
  <>
    <TitleSkeleton />
    <ul>
      {Array.from({ length: PERSONS_COUNT }).map((_, i) => (
        <li key={i} className="flex items-center gap-3 md:gap-4 lg:gap-7 py-4 md:py-5 border-b border-noir-border">
          <Skeleton className="flex-shrink-0 rounded-xl md:rounded-2xl w-[88px] h-[126px] md:w-[120px] md:h-[171px] xl:w-[130px] xl:h-[186px]" />
          <div className="flex-1 min-w-0">
            <Skeleton className="h-5 w-1/2 rounded-5 mb-2 md:h-7 md:mb-3" />
            <div className="flex gap-1.5">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-5">
            <Skeleton className="w-12 h-10 rounded-5" />
            <Skeleton className="w-24 h-9 rounded-full" />
          </div>
        </li>
      ))}
    </ul>
  </>
)

const REVIEWS_COUNT = 3
export const ReviewsSkeleton = () => (
  <>
    <TitleSkeleton />
    <div className="flex flex-col gap-4">
      {Array.from({ length: REVIEWS_COUNT }).map((_, i) => (
        <div key={i} className="border border-noir-border rounded-10 p-4 bg-noir-card">
          <div className="flex items-center gap-3 mb-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-32 rounded-5" />
              <Skeleton className="h-3 w-20 rounded-5 mt-1" />
            </div>
          </div>
          <Skeleton className="h-4 w-full rounded-5" />
          <Skeleton className="h-4 w-5/6 rounded-5 mt-1.5" />
          <Skeleton className="h-4 w-2/3 rounded-5 mt-1.5" />
        </div>
      ))}
    </div>
  </>
)

const COMMENTS_COUNT = 2
export const CommentsSkeleton = () => (
  <>
    <TitleSkeleton />
    <div className="flex flex-col gap-3">
      {Array.from({ length: COMMENTS_COUNT }).map((_, i) => (
        <article key={i} className="flex gap-4 border border-noir-border rounded-10 p-4 bg-noir-card">
          <Skeleton className="w-16 h-24 rounded-5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <Skeleton className="h-4 w-40 rounded-5" />
            <Skeleton className="h-3 w-24 rounded-5 mt-1 mb-2" />
            <Skeleton className="h-4 w-full rounded-5" />
            <Skeleton className="h-4 w-4/5 rounded-5 mt-1" />
          </div>
        </article>
      ))}
    </div>
  </>
)

export const SettingSkeleton = () => (
  <>
    <div className={cls.titleWrapper}>
      <Skeleton className="h-7 w-44 rounded-5 md:h-8" />
      <Skeleton className="h-10 w-32 rounded-5" />
    </div>
    <div className="sm:mr-10 sm:ml-9 md:flex md:flex-wrap md:gap-4 md:items-center">
      <Skeleton className="w-[240px] max-w-full aspect-square rounded-10 mx-auto md:mx-0 md:shrink-0" />
      <div className="md:order-3 md:w-full flex flex-col gap-2 mt-4 md:mt-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-5" />
        ))}
      </div>
      <div className="md:flex-1 flex flex-col gap-1.5 mt-4 md:mt-0">
        <Skeleton className="h-10 w-full rounded-5" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-5" />
        ))}
      </div>
    </div>
  </>
)
