# Architecture & Project Structure

## General Architecture

Kinoarea is a React 18 SPA with client-side routing (React Router v6). The app has no custom backend: movie and actor data comes from the TMDB API, while user data is stored in Firebase (Firestore + Auth + Storage).

Build tooling is Vite 3. Deployment is on Vercel with SPA fallback (`vercel.json` redirects all requests to `index.html`).

## `src/` Structure

```
src/
├── api/                    # Data access layer
│   ├── movieDBApi/         # TMDB API wrapper (axios)
│   │   └── index.tsx       # All TMDB requests (getSearch, getMovieDetails, getCast, ...)
│   ├── firebase/           # Firebase Firestore/Auth/Storage
│   │   ├── base.ts         # Firebase initialization (app, db, auth)
│   │   ├── users.ts        # CRUD for users and friends
│   │   ├── films.ts        # Favorite films, statuses (liked/disliked/favourite)
│   │   ├── persons.ts      # Favorite actors
│   │   ├── reviews.ts      # User reviews
│   │   ├── services.ts     # News, subscriptions, image uploads
│   │   ├── helpers.ts      # Helpers (getCollectionRef, getDocsInfo)
│   │   ├── endpoints.ts    # Firebase endpoint constants
│   │   └── index.tsx       # FirebaseApi export
│   ├── types/              # TypeScript types for API responses
│   ├── endpoints.tsx       # URL path constants & TMDB assets URL
│   └── index.tsx           # Combined API export
│
├── components/
│   ├── business/           # Business components
│   │   ├── auth/           # Login/registration forms
│   │   ├── ProtectedRoute/ # Route guard (redirects unauthenticated users)
│   │   ├── LanguageToggler/# Language switcher (uk/en)
│   │   └── SearchFilmButton/
│   ├── layout/
│   │   └── Layout.tsx      # Wrapper: Header + main content + Footer
│   └── ui/                 # Reusable UI components (~60+)
│       ├── Button/
│       ├── Input/
│       ├── Select/
│       ├── modals/         # Modal windows (AuthModal, Notification, ...)
│       ├── sliders/        # Sliders (Swiper-based)
│       ├── Film/           # Film card
│       ├── FilmList/       # Film list
│       ├── PersonCard/     # Actor card
│       ├── Skeleton/       # Skeletons for lazy loading
│       ├── Pagination/     # Pagination
│       ├── SearchBar/      # Search bar
│       └── ...
│
├── pages/                  # Pages (1 folder = 1 route)
│   ├── Main/               # Home: NowPlaying, Popular, Upcoming, News, Persons, Profit
│   ├── FilmPage/           # Film details
│   ├── Actors/             # Actor list
│   ├── Actor/              # Actor profile
│   ├── News/               # News
│   ├── Collections/        # Film collections
│   ├── Premiere/           # Premieres
│   ├── SearchResult/       # Search results
│   ├── Profile/            # User profile (with subpages)
│   └── NotFound/           # 404
│
├── redux/                  # State management
│   ├── store/              # Store configuration
│   ├── reducers/           # Reducers (movies, genres, persons, user, ...)
│   ├── actions/            # Action type constants
│   ├── actionsCreators/    # Synchronous action creators
│   ├── actionsTypes/       # TypeScript action types
│   ├── redux-async/        # Thunks (async action creators)
│   └── provider/           # ReduxProvider wrapper
│
├── router/                 # React Router configuration
│   ├── index.tsx           # createBrowserRouter with all routes
│   └── paths.ts            # Path constants (ProfilePages, FilmPaths)
│
├── hooks/                  # Custom hooks (useMediaQuery, ...)
├── i18n/                   # i18next configuration + locales (en, uk)
├── styles/                 # Global SCSS styles
├── utils/                  # Utility functions (getRating, getRatingColor, ...)
└── mock/                   # Static mock data (categories, schedules, notifications)
```

## Conventions

- **Path alias**: `@` → `src/` (configured in `vite.config.ts` and `tsconfig.json`)
- **Component naming**: PascalCase directory with a same-name `.tsx` file inside (e.g. `Button/Button.tsx`)
- **Lazy loading**: all pages are loaded via `React.lazy()` with individual Skeleton components as fallbacks
- **Fonts**: Qanelas (primary, woff2), Playfair Display (serif), Inter (sans-serif)
- **Design theme**: dark (noir `#0B0B0B`), accent gold (`#D4A574`)
