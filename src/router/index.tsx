import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { WithSuspense } from '../components/ui/WithSuspense/WithSuspense'
import { loadActor } from '../pages/Actor/loader'
//import { ProtectedRoute } from '../components/business/ProtectedRoute/ProtectedRoute'

import { NowPlayingSkeleton } from '../pages/Main/sections/NowPlaying/NowPlayingSkeleton'
import { FilmPageSkeleton } from '../pages/FilmPage/FilmPageSkeleton'
import { ActorsSkeleton } from '../pages/Actors/ActorsSkeleton'
import { ActorSkeleton } from '../pages/Actor/ActorSkeleton'
import { SearchResultSkeleton } from '../pages/SearchResult/SearchResultSkeleton'
import { NewsSkeleton } from '../pages/News/NewsSkeleton'
import { PremiereSkeleton } from '../pages/Premiere/PremiereSkeleton'
import { CollectionsSkeleton } from '../pages/Collections/CollectionsSkeleton'
import { FilmActorsSkeleton } from '../pages/FilmActors/FilmActorsSkeleton'
import { FilmPostersSkeleton } from '../pages/FilmPosters/FilmPostersSkeleton'

const Main = lazy(() => import('../pages/Main/Main').then(m => ({ default: m.Main })))
const NotFound = lazy(() => import('../pages/NotFound/NotFound').then(m => ({ default: m.NotFound })))
const Premiere = lazy(() => import('../pages/Premiere/Premiere').then(m => ({ default: m.Premiere })))
const FilmPage = lazy(() => import('../pages/FilmPage/FilmPage').then(m => ({ default: m.FilmPage })))
const News = lazy(() => import('../pages/News/News').then(m => ({ default: m.News })))
const OneNews = lazy(() => import('../pages/OneNews/OneNews').then(m => ({ default: m.OneNews })))
const Collections = lazy(() => import('../pages/Collections/Collections').then(m => ({ default: m.Collections })))
const ChosenCollection = lazy(() =>
  import('../pages/Collections/subpages/ChosenCollection').then(m => ({ default: m.ChosenCollection }))
)
const SearchResult = lazy(() => import('../pages/SearchResult/SearchResult').then(m => ({ default: m.SearchResult })))
const Profile = lazy(() => import('../pages/Profile/Profile').then(m => ({ default: m.Profile })))
const ProfileMain = lazy(() =>
  import('../pages/Profile/subpages/ProfileMain/ProfileMain').then(m => ({ default: m.ProfileMain }))
)
const ProfileSetting = lazy(() =>
  import('../pages/Profile/subpages/Setting/Setting').then(m => ({ default: m.Setting }))
)
const UserReviews = lazy(() =>
  import('../pages/Profile/subpages/UserReviews/UserReviews').then(m => ({ default: m.UserReviews }))
)
const Friends = lazy(() => import('../pages/Profile/subpages/Friends/Friends').then(m => ({ default: m.Friends })))
const Likes = lazy(() => import('../pages/Profile/subpages/Likes/Likes').then(m => ({ default: m.Likes })))
const FavouriteFilms = lazy(() =>
  import('../pages/Profile/subpages/FavouriteFilms/FavouriteFilms').then(m => ({ default: m.FavouriteFilms }))
)
const Famous = lazy(() => import('../pages/Profile/subpages/Famous/Famous').then(m => ({ default: m.Famous })))
const Actors = lazy(() => import('../pages/Actors/Actors').then(m => ({ default: m.Actors })))
const Actor = lazy(() => import('../pages/Actor/Actor').then(m => ({ default: m.Actor })))
const ActorImages = lazy(() => import('../pages/ActorImages/ActorImages').then(m => ({ default: m.ActorImages })))
const FilmActors = lazy(() => import('../pages/FilmActors/FilmActors').then(m => ({ default: m.FilmActors })))
const FilmPosters = lazy(() => import('../pages/FilmPosters/FilmPosters').then(m => ({ default: m.FilmPosters })))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <WithSuspense fallback={<NowPlayingSkeleton />}>
            <Main />
          </WithSuspense>
        ),
      },
      {
        path: 'premiere',
        element: (
          <WithSuspense fallback={<PremiereSkeleton />}>
            <Premiere />
          </WithSuspense>
        ),
      },
      {
        path: 'films',
        element: (
          <WithSuspense fallback={<SearchResultSkeleton />}>
            <SearchResult />
          </WithSuspense>
        ),
      },
      {
        path: 'films/:slug',
        element: (
          <WithSuspense fallback={<FilmPageSkeleton />}>
            <FilmPage />
          </WithSuspense>
        ),
      },
      {
        path: 'films/:slug/actors',
        element: (
          <WithSuspense fallback={<FilmActorsSkeleton />}>
            <FilmActors />
          </WithSuspense>
        ),
      },
      {
        path: 'films/:slug/posters',
        element: (
          <WithSuspense fallback={<FilmPostersSkeleton />}>
            <FilmPosters />
          </WithSuspense>
        ),
      },
      {
        path: 'news',
        element: (
          <WithSuspense fallback={<NewsSkeleton />}>
            <News />
          </WithSuspense>
        ),
      },
      {
        path: 'news/:slug',
        element: (
          <WithSuspense>
            <OneNews />
          </WithSuspense>
        ),
      },
      {
        path: 'collections',
        element: (
          <WithSuspense fallback={<CollectionsSkeleton />}>
            <Collections />
          </WithSuspense>
        ),
        children: [
          {
            path: ':slug',
            element: (
              <WithSuspense fallback={<CollectionsSkeleton />}>
                <ChosenCollection />
              </WithSuspense>
            ),
          },
        ],
      },
      {
        path: 'profile',
        element: (
          <>
            <WithSuspense>
              <Profile />
            </WithSuspense>
          </>
        ),
        children: [
          {
            index: true,
            element: (
              <WithSuspense>
                <ProfileMain />
              </WithSuspense>
            ),
          },
          {
            path: 'setting',
            element: (
              <WithSuspense>
                <ProfileSetting />
              </WithSuspense>
            ),
          },
          {
            path: 'friends',
            element: (
              <WithSuspense>
                <Friends />
              </WithSuspense>
            ),
          },
          {
            path: 'reviews',
            element: (
              <WithSuspense>
                <UserReviews />
              </WithSuspense>
            ),
          },
          {
            path: 'likes',
            element: (
              <WithSuspense>
                <Likes />
              </WithSuspense>
            ),
          },
          {
            path: 'comments',
            element: (
              <WithSuspense>
                <UserReviews />
              </WithSuspense>
            ),
          },
          {
            path: 'films',
            element: (
              <WithSuspense>
                <FavouriteFilms />
              </WithSuspense>
            ),
          },
          {
            path: 'famous',
            element: (
              <WithSuspense>
                <Famous />
              </WithSuspense>
            ),
          },
          {
            path: '*',
            element: <Navigate to={'/profile'} />,
          },
        ],
      },
      {
        path: 'actors',
        element: (
          <WithSuspense fallback={<ActorsSkeleton />}>
            <Actors />
          </WithSuspense>
        ),
      },
      {
        path: 'actors/:actorId',
        element: (
          <WithSuspense fallback={<ActorSkeleton />}>
            <Actor />
          </WithSuspense>
        ),
        loader: loadActor,
        children: [
          {
            path: 'images',
            element: (
              <WithSuspense>
                <ActorImages />
              </WithSuspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: (
      <WithSuspense>
        <NotFound />
      </WithSuspense>
    ),
  },
])
