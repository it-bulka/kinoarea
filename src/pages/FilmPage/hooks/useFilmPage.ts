import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  getCast,
  getMovieDetails,
  getMovieVideos,
  getPosters,
  getReview,
  getSimilarMovies,
} from '../../../api/movieDBApi'
import { ICastRes, IMovieDetailsRes, IMovieVideo, IPoster, IReview } from '../../../api/types/responses'
import { IMovieRes } from '../../../api/types'
import { IFbFavouriteMovie, IFilmStatus } from '../../../api/types/film'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useActions } from '../../../hooks/useActions'
import { notificationList } from '../../../mock/notificationList'
import { FirebaseApi } from '../../../api/firebase'

export const useFilmPage = (slug: string | undefined) => {
  const [details, setDetails] = useState<IMovieDetailsRes | null>(null)
  const [cast, setCast] = useState<ICastRes[]>([])
  const [posters, setPosters] = useState<IPoster[]>([])
  const [reviews, setReviews] = useState<IReview[]>([])
  const [similar, setSimilar] = useState<IMovieRes[]>([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const [videos, setVideos] = useState<IMovieVideo[]>([])
  const [isCommentBlockShown, setCommentBlockShown] = useState(false)
  const [favouriteFilm, setFavouriteFilm] = useState<IFbFavouriteMovie | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const user = useTypedSelector(state => state.user.user)
  const { setNotification } = useActions()

  useEffect(() => {
    if (!slug) return
    setIsLoading(true)
    Promise.all([
      getCast(slug).then(setCast),
      getPosters(slug).then(setPosters),
      getReview(slug).then(setReviews),
      getSimilarMovies(slug).then(setSimilar),
      getMovieDetails(slug).then(setDetails),
      getMovieVideos(slug).then(vids => {
        const youtubeVideos = vids.filter(v => v.site === 'YouTube')
        setVideos(youtubeVideos)
        const trailer = youtubeVideos.find(v => v.type === 'Trailer')
        setTrailerKey(trailer?.key ?? youtubeVideos[0]?.key ?? null)
      }),
    ]).finally(() => setIsLoading(false))
  }, [slug])

  useEffect(() => {
    if (!slug || !user) return
    FirebaseApi.getFavouriteFilm({ userId: user.id, filmId: slug }).then(setFavouriteFilm)
  }, [slug, user])

  const film: Omit<IFbFavouriteMovie, 'status'> | null = useMemo(
    () =>
      details && {
        id: details.id,
        poster_path: details.poster_path,
        name: details.title,
        original_name: details.original_title,
      },
    [details]
  )

  const handleStatusToggle = useCallback(
    async (filmStatus: IFilmStatus): Promise<void> => {
      if (!film || !user) return
      const updated = await FirebaseApi.toggleFilmStatus({ userId: user.id, film, filmStatus })
      setFavouriteFilm(updated)
    },
    [film, user]
  )

  const handlePlay = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  const handleVideoSelect = useCallback((key: string) => {
    setTrailerKey(key)
    setModalOpen(true)
  }, [])

  const addComment = useCallback(() => {
    if (user) {
      setCommentBlockShown(prev => !prev)
      return
    }
    setNotification(notificationList.userAbsentComment)
  }, [user, setNotification])

  const onLikeClick = useCallback(async () => {
    if (!user) {
      setNotification(notificationList.userAbsent)
      return
    }
    await handleStatusToggle('liked')
  }, [user, handleStatusToggle, setNotification])

  const onDislikeClick = useCallback(async () => {
    if (!user) {
      setNotification(notificationList.userAbsent)
      return
    }
    await handleStatusToggle('disliked')
  }, [user, handleStatusToggle, setNotification])

  const onFavouriteClick = useCallback(async () => {
    if (!user) {
      setNotification(notificationList.userAbsentFavourite)
      return
    }
    await handleStatusToggle('favourite')
  }, [user, handleStatusToggle, setNotification])

  return {
    details,
    cast,
    posters,
    reviews,
    similar,
    videos,
    isLoading,
    isModalOpen,
    trailerKey,
    favouriteFilm,
    isCommentBlockShown,
    user,
    handlePlay,
    closeModal,
    handleVideoSelect,
    addComment,
    onLikeClick,
    onDislikeClick,
    onFavouriteClick,
  }
}
