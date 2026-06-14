import { IMovieRes } from './film'
import { SocialMedias } from './socialMedias'
import { Timestamp } from 'firebase/firestore'
import { MOVIETV } from './requests'
import { GenreIds } from '../../mock/types'

/* MovieDB */
export type CustomError = null | string
export const MovieDBPageSize = 20

export interface IGenre {
  id: number
  name: string
}

interface IMovieTitle {
  media_type: 'movie'
  title: string
  original_title: string
}

interface ITvTitle {
  media_type: 'tv'
  name: string
  original_name: string
}

export type IKnownFor = ({
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  overview: string
  poster_path: string
  release_date: string
  video: boolean
  vote_average: boolean
  vote_count: number
} & (IMovieTitle | ITvTitle))[]

export interface IPerson {
  adult: boolean
  gender: number
  id: number
  known_for: IKnownFor
  known_for_department: string
  name: string
  popularity: number
  profile_path: string
}

export interface IPersonDetail {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: Date | null
  deathday: Date | null
  gender: number
  homepage: string | null
  id: number
  imdb_id: number
  known_for_department: string
  name: string
  place_of_birth: string | null
  popularity: number
  profile_path: string
}

export interface IPersonImg {
  aspect_ratio: number
  height: number
  iso_639_1: null
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}
export interface IPersonImages {
  id: number
  profiles: IPersonImg[]
}

export type IPersonCombinedCredits = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  overview: string
  popularity: number
  poster_path: string
  release_date: Date
  video: boolean
  vote_average: number
  vote_count: number
  character: string
  credit_id: string
  order: 0
  media_type: MOVIETV
} & (IMovieTitle | ITvTitle)
export interface IPersonCredits {
  cast: IPersonCombinedCredits[]
}

export type IPersonFullInfo = IPersonDetail & { images: Omit<IPersonImages, 'id'> } & {
  combined_credits: IPersonCredits
}

/* MOVIE */
export interface ICastRes {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: number
  order: number
}

export interface ICrewRes {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
  department: string
  job: string
}

export interface ICreditsRes {
  id: number
  cast: ICastRes[]
  crew: ICrewRes[]
}

export interface IPoster {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface IMovieImagesRes {
  id: number
  backdrops: []
  logos: []
  posters: IPoster[]
}

export interface IReview {
  author: string
  author_details: {
    name: string
    username: string
    avatar_path: string
    rating: number
  }
  content: string
  created_at: Date
  id: string
  updated_at: Date
  url: string
}

export interface IReviewsRes {
  id: number
  page: number
  results: IReview[]
}

export interface ISimilarRes {
  page: number
  results: IMovieRes[]
  total_pages: number
  total_results: number
}

export interface IMovieVideo {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
  published_at: string
}

export interface IMovieVideosRes {
  id: number
  results: IMovieVideo[]
}

export interface IMovieDetailsRes {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null | []
  budget: number
  genres: { id: number; name: string }[]
  homepage: URL
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: Date
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type ISearchMovieResult = IMovieRes & {
  media_type: 'movie'
}

interface IResponse {
  page: number
  results: any[]
  total_pages: number
  total_results: number
}

export interface ISearchResult extends IResponse {
  results: ISearchMovieResult[]
}

export interface IDiscoverResult extends IResponse {
  results: IMovieRes[]
}

export interface IPersonResult extends IResponse {
  results: IPerson[]
}

/* firebase */
export type SexType = 'male' | 'female' | 'others' | 'notchosen'

export interface IUser {
  id: string
  name: string
  surname: string | null
  birthday?: Timestamp | null
  sex?: SexType
  img?: string
  country?: string
  city?: string
  genres?: GenreIds
  about?: string
  links?: { [K in SocialMedias]: string | null }
  friends?: string[]
  incomingFriends?: string[]
  reviews?: number[]
}

export interface IUserReview extends Pick<IReview, 'content' | 'id' | 'author_details'> {
  userId: string
  created_at: Timestamp | Date
  movie: {
    id: string | number
    name: string
    poster: string
  }
}

export interface IFriend extends Pick<IUser, 'id' | 'name' | 'surname' | 'img' | 'friends'> {}
