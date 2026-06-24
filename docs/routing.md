# Routing & Pages

Router configuration: `src/router/index.tsx`. Uses `createBrowserRouter` from React Router v6.

## Route Map

### Public Pages

| Route | Page | Description |
|---|---|---|
| `/` | Main | Home: NowPlaying, Popular, Upcoming, News, Persons, Profit sections |
| `/premiere` | Premiere | Upcoming premieres |
| `/films` | SearchResult | Movie search and filtering |
| `/films/:slug` | FilmPage | Film details (cast, reviews, trailers, similar movies) |
| `/films/:slug/actors` | FilmActors | Full film cast |
| `/films/:slug/posters` | FilmPosters | Film posters |
| `/films/:slug/videos` | FilmVideosPage | Film videos/trailers |
| `/news` | News | News list |
| `/news/:slug` | OneNews | Single news article |
| `/collections` | Collections | Film collections |
| `/collections/:slug` | ChosenCollection | Single collection |
| `/actors` | Actors | Popular actors list |
| `/actors/:actorId` | Actor | Actor profile (with loader) |
| `/actors/:actorId/images` | ActorImages | Actor photo gallery |
| `*` | NotFound | 404 |

### User Profile (Protected)

Wrapped in the `Profile` layout. The `/profile/*` route redirects unknown paths back to `/profile`.

| Route | Page | Description |
|---|---|---|
| `/profile` | ProfileMain | Main profile info |
| `/profile/setting` | Setting | Profile settings |
| `/profile/friends` | Friends | Friends list |
| `/profile/reviews` | UserReviews | User reviews |
| `/profile/likes` | Likes | Liked movies |
| `/profile/comments` | UserComments | Comments |
| `/profile/films` | FavouriteFilms | Favorite movies |
| `/profile/famous` | Famous | Favorite actors |

## Key Details

- **Lazy loading**: all pages are loaded via `React.lazy()` with individual Skeleton components as fallbacks
- **Error boundary**: `RouteErrorFallback` is used as the `errorElement` on the root route and the actor route
- **WithSuspense**: a custom wrapper around `React.Suspense` for unified fallback rendering
- **Actor loader**: the `/actors/:actorId` route uses a React Router `loader` for data pre-fetching
- **Path constants**: `src/router/paths.ts` exports `Paths.profile.*` and `Paths.film.*` for type-safe navigation
