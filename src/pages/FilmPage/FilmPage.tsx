import { Breadcrumbs } from '../../components/ui/Breadcrumbs/Breadcrumbs'
import { ReactComponent as PlayIcon } from '../../assets/images/general/play-btn.svg'
import cls from './FilmPage.module.scss'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getCast, getMovieDetails, getMovieVideos, getPosters, getReview, getSimilarMovies } from '../../api/movieDBApi'
import { ICastRes, IMovieDetailsRes, IMovieVideo, IPoster, IReview } from '../../api/types/responses'
import { SectionHeader, SectionHeaderType } from '../../components/ui/SectionHeader/SectionHeader'
import { CastList } from '../../components/ui/CastList/CastList'
import { PostersList } from '../../components/ui/PostersList/PostersList'
import { Typography, TypographyTypes } from '../../components/ui/Typography/Typography'
import { FilmSlider } from '../../components/ui/sliders/FilmSlider/FilmSlider'
import { SliderNav } from '../../components/ui/sliders/SliderNav/SliderNav'
import { IMovieRes } from '../../api/types'
import { ReviewsList } from '../../components/ui/ReviewsList/ReviewsList'
import { Button } from '../../components/ui/Button/Button'
import { setMovieDBPath } from '../../utils'
import { RateBadge } from '../../components/ui/RateBadge/RateBadge'
import { Description } from './sections/Descriotion/Description'
import { FilmVideos } from './sections/FilmVideos/FilmVideos'
import { MovieModal } from '../../components/ui/modals/MovieModal/MovieModal'
import { Comment } from '../../components/ui/Comment/Comment'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import { notificationList } from '../../mock/notificationList'
import { IconBtn } from '../../components/ui/IconBtn/IconBtn'
import { FirebaseApi } from '../../api/firebase'
import { IFbFavouriteMovie, IFilmStatus } from '../../api/types/film'
import { useTranslation } from 'react-i18next'
import { FilmHeroSkeleton } from './sections/FilmHeroSkeleton'
import { FilmCastSkeleton } from './sections/FilmCastSkeleton'
import { FilmPostersSkeleton } from './sections/FilmPostersSkeleton'
import { FilmSimilarSkeleton } from './sections/FilmSimilarSkeleton'
import { FilmReviewsSkeleton } from './sections/FilmReviewsSkeleton'

export const FilmPage = () => {
  const { slug } = useParams()
  const [details, setDetails] = useState<IMovieDetailsRes | null>(null)
  const [cast, setCast] = useState<ICastRes[]>([])
  const [posters, setPosters] = useState<IPoster[]>([])
  const [reviews, setReviews] = useState<IReview[]>([])
  const [similar, setSimilar] = useState<IMovieRes[]>([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const [videos, setVideos] = useState<IMovieVideo[]>([])
  const user = useTypedSelector(state => state.user.user)
  const [isCommentBlockShown, setCommentBlockShown] = useState(false)
  const [favouriteFilm, setFavouriteFilm] = useState<IFbFavouriteMovie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { setNotification } = useActions()
  const { t } = useTranslation()

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

    if (!user) return
    FirebaseApi.getFavouriteFilm({ userId: user.id, filmId: slug }).then(setFavouriteFilm)
  }, [slug])

  const handlePlay = () => setModalOpen(true)

  const handleVideoSelect = useCallback((key: string) => {
    setTrailerKey(key)
    setModalOpen(true)
  }, [])

  const addComment = () => {
    if (user) {
      setCommentBlockShown(prev => !prev)
      return
    }
    setNotification(notificationList.userAbsentComment)
  }

  const film: Omit<IFbFavouriteMovie, 'status'> | null = useMemo(() => {
    return (
      details && {
        id: details?.id,
        poster_path: details?.poster_path,
        name: details?.title,
        original_name: details?.original_title,
      }
    )
  }, [details])

  const handleStatusToggle = useCallback(
    async (filmStatus: IFilmStatus): Promise<void> => {
      if (!film || !user) return
      const updated = await FirebaseApi.toggleFilmStatus({ userId: user.id, film, filmStatus })
      setFavouriteFilm(updated)
    },
    [film, user]
  )

  const onLikeClick = async () => {
    if (!user) {
      setNotification(notificationList.userAbsent)
      return
    }
    await handleStatusToggle('liked')
  }

  const onDislikeClick = async () => {
    if (!user) {
      setNotification(notificationList.userAbsent)
      return
    }
    await handleStatusToggle('disliked')
  }

  const onFavouriteClick = async () => {
    if (!user) {
      setNotification(notificationList.userAbsentFavourite)
      return
    }
    await handleStatusToggle('favourite')
  }

  return (
    <>
      {details && (
        <div
          style={{ backgroundImage: `url(${setMovieDBPath(details?.backdrop_path || details?.poster_path)})` }}
          className={'bg-no-repeat bg-cover bg-top absolute w-full aspect-[3/4] left-0 -z-1 opacity-40 '}
        />
      )}
      <div
        className={
          'container pt-[24px] pb-6 md:pt-9 md:pb-[42px] lg:pt-7 lg:pb-14 2xl:pt-16 2zl:pb-[69px] relative z-10'
        }
      >
        {isLoading || !details ? (
          <FilmHeroSkeleton />
        ) : (
          <>
            <section className={'md:flex md:flex-row-reverse md:justify-end md:gap-[17px] lg:gap-8 2xl:gap-[54px]'}>
              <div>
                <div className={'w-full mb-3 md:mb-4'}>
                  <Breadcrumbs lastCrumb={details.title} />
                  <h3 className={'text-32 font-q-900 mb-1 md:text-40 md:my-[3px] 2xl:text-60'}>{details.title}</h3>
                  <p className={'text-2xl font-q-500 2xl:text-2xl'}>{details.original_title}</p>
                </div>
                <div className={'flex'}>
                  <img
                    src={setMovieDBPath(details.poster_path)}
                    alt={'film'}
                    className={'rounded-10 w-[63%] object-cover aspect-[230/310] md:hidden'}
                  />
                  <div className={'w-[37%] flex flex-col items-center gap-2 md:w-auto'}>
                    <RateBadge rating={details.vote_average} />
                    <p className={'text-xs text-white/60 text-center'}>
                      {details.vote_count.toLocaleString()} {t('film.votes')}
                    </p>
                  </div>
                </div>
                <div>
                  <div className={'mt-4 mb-11 md:my-4'}>{details.overview}</div>
                  <Button variant={'transparent'} className={cls.playBtn} onClick={handlePlay}>
                    <>
                      <PlayIcon />
                      <span>{t('film.watchTrailer')}</span>
                    </>
                  </Button>
                </div>
              </div>

              <div>
                <img
                  src={setMovieDBPath(details.poster_path)}
                  alt={'film'}
                  className={'hidden rounded-10 object-cover aspect-[230/310] md:block md:max-w-[297px]'}
                />
                <div className={'flex items-center text-white gap-1 text-0.5rem'}>
                  <IconBtn type={'like'} isActive={!!favouriteFilm?.status?.includes('liked')} onClick={onLikeClick} />
                  <IconBtn
                    type={'dislike'}
                    isActive={!!favouriteFilm?.status?.includes('disliked')}
                    onClick={onDislikeClick}
                  />
                  <IconBtn
                    type={'heart'}
                    isActive={!!favouriteFilm?.status?.includes('favourite')}
                    onClick={onFavouriteClick}
                  />
                </div>
              </div>

              <MovieModal close={() => setModalOpen(false)} isOpened={isModalOpen} videoKey={trailerKey} />
            </section>

            <section>
              <Description {...details} />
            </section>
          </>
        )}

        <section>
          <SectionHeader
            title={t('film.cast')}
            type={SectionHeaderType.ARROW}
            linkTitle={t('film.allActors')}
            className={'mb-4 mt-7 md:mb-8 2xl:mb-20'}
          />
          {isLoading ? <FilmCastSkeleton /> : <CastList list={cast} />}
        </section>

        <section>
          <SectionHeader
            title={t('film.posters')}
            type={SectionHeaderType.ARROW}
            linkTitle={t('film.allPosters')}
            className={'mb-4 mt-7 md:mb-8 2xl:mb-20'}
          />
          {isLoading ? <FilmPostersSkeleton /> : <PostersList list={posters} title={''} />}
        </section>

        <section>
          <Typography
            variant={'h3'}
            type={TypographyTypes._TITLE}
            className={'mx-auto mt-9 mb-[18px] md:mt-[52px] md:mb-9 2xl:mt-[73px] 2xl:mb-[42px] w-max'}
          >
            {t('film.similar')}
          </Typography>
          {isLoading ? (
            <FilmSimilarSkeleton />
          ) : (
            <>
              <FilmSlider slides={similar} name={`film-${slug}`} />
              <div className={'flex justify-center items-center mt-8'}>
                <SliderNav sliderName={`film-${slug}`} />
              </div>
            </>
          )}
        </section>

        <section>
          <div className={'mb-5 mt-24 md:flex md:justify-between'}>
            <Typography variant={'h3'} type={TypographyTypes._TITLE} className={'mx-auto w-max mb-[54px] md:m-0'}>
              {t('film.reviews')}
            </Typography>
            <Button className={'mx-auto md:m-0'} onClick={addComment}>
              {isCommentBlockShown ? t('film.hideReview') : t('film.addReview')}
            </Button>
          </div>
          {user && isCommentBlockShown && (
            <Comment
              userImg={user.img || ''}
              userName={user.name}
              userSurname={user.surname || ''}
              userId={user.id}
              movie={{
                id: details?.id || '',
                name: details?.title || '',
                poster: details?.poster_path || '',
              }}
              className={'mb-4'}
            />
          )}
          {isLoading ? <FilmReviewsSkeleton /> : <ReviewsList list={reviews} />}
        </section>

        {!isLoading && videos.length > 0 && (
          <section className={'rounded-10 pt-4 px-3.5 pb-8 lg:py-10 lg:px-5'}>
            <FilmVideos videos={videos} onVideoSelect={handleVideoSelect} />
          </section>
        )}
      </div>
    </>
  )
}
