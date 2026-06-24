# API: TMDB & Firebase

## TMDB API

The wrapper is located in `src/api/movieDBApi/index.tsx`. It uses axios with a base URL of `https://api.themoviedb.org/3`.

### Configuration

- Authorization: Bearer token via the `VITE_MOVIEDB_TOKEN` env variable
- Language: automatically appended to every request via an axios interceptor (value from the Redux `language` state)
- Images: `https://image.tmdb.org/t/p/{size}{path}`, base assets URL in `VITE_MOVIEDB_ASSETS`

### Available Functions

| Function | Description |
|---|---|
| `getSearch(options)` | Search/discover movies by category, query, or filters |
| `getMovieDetails(id)` | Movie details |
| `getCast(id)` | Movie cast |
| `getPosters(id, lang)` | Movie posters |
| `getReview(id)` | Movie reviews (from TMDB) |
| `getSimilarMovies(id)` | Similar movies |
| `getMovieVideos(id)` | Movie videos/trailers |
| `getTrendingMovies(timeWindow, params)` | Trending movies (day/week) |
| `getSearchedItem(value, page)` | Search by text query |
| `getPersons(params)` | List of popular actors |
| `getPersonFullInfo(id)` | Full actor info (with photos and credits) |
| `getGenres(type)` | Genre list (movie/tv) |

---

## Firebase

Initialization in `src/api/firebase/base.ts`. Project: `kinoarea-90de5`.

### Services

- **Firestore** — primary data store
- **Auth** — user authentication
- **Storage** — profile image storage (`profiles/{userId}`)

### Firestore Collections

#### `users`
User profiles.

| Field | Type | Description |
|---|---|---|
| `name` | string | First name |
| `surname` | string | Last name |
| `img` | string | Avatar URL |
| `friends` | string[] | Accepted friend IDs |
| `incomingFriends` | string[] | Incoming friend request IDs |

#### `reviews`
User movie reviews.

| Field | Type | Description |
|---|---|---|
| `userId` | string | Author ID |
| `filmId` | string | Movie ID |
| `text` | string | Review text |
| `rating` | number | Rating |

#### `films/{userId}/films/{filmId}`
Nested subcollection — film statuses per user.

| Field | Type | Description |
|---|---|---|
| `status` | IFilmStatus[] | Status array: `'favourite'`, `'liked'`, `'disliked'` |

### Firebase API Functions

Exported via the `FirebaseApi` object (`src/api/firebase/index.tsx`):

**Users & Friends:**
`getUser`, `createUser`, `refreshUser`, `getUserFriends`, `addUserFriend`, `removeUserFriend`, `addIncomingFriend`, `removeIncomingFriend`

**Reviews:**
`getUserReviews`, `getUserReviewsPaginated`, `getMovieReviews`, `setUserReview`, `deleteUserReview`

**Films:**
`addFavouriteFilm`, `removeFavouriteFilm`, `getFavouriteFilms`, `getFavouriteFilm`, `toggleFilmStatus`

**Actors:**
`addFavouritePerson`, `removeFavouritePerson`, `getFavouritePersons`

**Services:**
`getNews`, `getNewsItem`, `addSubscription`, `trackDeletedImage`, `uploadProfileImg`

### Environment Variables

| Variable | Description |
|---|---|
| `VITE_MOVIEDB_TOKEN` | Bearer token for TMDB API |
| `VITE_MOVIEDB_ASSETS` | Base URL for TMDB images |
| `VITE_FIREFASE_TOKEN` | Firebase API key |
