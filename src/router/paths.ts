export const ProfilePages = {
  main: '/profile',
  setting: '/profile/setting',
  friends: '/profile/friends',
  reviews: '/profile/reviews',
  likes: '/profile/likes',
  comments: '/profile/comments',
  films: '/profile/films',
  famous: '/profile/famous',
}

export const FilmPaths = {
  detail: (slug: string | number) => `/films/${slug}`,
  actors: (slug: string | number) => `/films/${slug}/actors`,
}

export const Paths = {
  profile: ProfilePages,
  film: FilmPaths,
}
