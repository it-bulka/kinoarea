# State Management (Redux)

The project uses Redux with redux-thunk for async operations. The Redux code is located in `src/redux/`.

## Structure

```
redux/
├── store/            # Store configuration (createStore + middleware)
├── provider/         # ReduxProvider — app wrapper
├── reducers/         # Reducers for each slice
│   └── rootReducer.ts  # combineReducers
├── actions/          # Action type constants (string constants)
├── actionsCreators/  # Synchronous action creators
├── actionsTypes/     # TypeScript action types (union types)
└── redux-async/      # Thunks — async action creators
```

## Slices

| Slice | Reducer | Purpose |
|---|---|---|
| `movies` | `moviesReducer.ts` | TMDB movie lists (nowPlaying, popular, upcoming) |
| `genres` | `genresReducer.ts` | TMDB genres |
| `heroSlider` | `heroSliderReducer.ts` | Hero slider state on the home page |
| `persons` | `personsReducer.ts` | Popular actors from TMDB |
| `profit` | `profitReducer.ts` | Box office data |
| `language` | `languageReducer.ts` | Current UI language (en/uk) |
| `user` | `userReducer.ts` | Authenticated Firebase user |
| `authForm` | `authForm.ts` | Auth modal state (open/closed) |
| `notification` | `notification.ts` | Global notification (modal) |
| `userFriends` | `userFriendsReducer.ts` | Current user's friends list |
| `incomingFriends` | `incomingFriends.ts` | Incoming friend requests |
| `userReviews` | `userReviews.ts` | Current user's reviews |
| `userFavouriteFilms` | `userFavouriteFilms.ts` | User's favorite films |
| `userFavouritePersons` | `userFavouritePersons.ts` | User's favorite actors |

## Data Flow

1. A component dispatches a thunk (from `redux-async/`)
2. The thunk makes an API request (TMDB or Firebase)
3. On success, a synchronous action is dispatched
4. The reducer updates the corresponding state slice
5. The component reacts via `useSelector`

## Additional Patterns

- **Preact Signals** (`@preact/signals-react`) — used in some components alongside Redux for local reactive state
- **Auth state** — controlled via the `authForm` slice; the auth modal opens globally (e.g., when attempting to leave a comment without being logged in)
