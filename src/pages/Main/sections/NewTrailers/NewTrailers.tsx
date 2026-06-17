import { SectionHeader, SectionHeaderType } from '../../../../components/ui/SectionHeader/SectionHeader'
import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import { IconBtn } from '../../../../components/ui/IconBtn/IconBtn'
import { VideoSlider } from '../../../../components/ui/sliders/VideoSlider/VideoSlider'
import { useEffect, useMemo, useState } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useVideoTrailers } from '../../../../hooks/useVideoTrailers'
import { ReactComponent as TwitterIcon } from '../../../../assets/images/general/icons8-twitter.svg'
import { ReactComponent as FacebookIcon } from '../../../../assets/images/general/facebook-f.svg'
import { ReactComponent as InstagramIcon } from '../../../../assets/images/general/instagram.svg'
import { ReactComponent as LinkedInIcon } from '../../../../assets/images/general/linkedin-in.svg'
import { setMovieDBPath } from '../../../../utils'
import { notificationList } from '../../../../mock/notificationList'
import { FirebaseApi } from '../../../../api/firebase'
import { IFbFavouriteMovie, IFilmStatus, IMovieRes } from '../../../../api/types/film'
import { NewTrailersSkeleton } from './NewTrailersSkeleton'
import { useTranslation } from 'react-i18next'
import { useMainSectionReveal } from '../../hooks/useMainSectionReveal'

const TRAILER_POOL_SIZE = 8

const toFbFilm = (m: IMovieRes): Omit<IFbFavouriteMovie, 'status'> => ({
  id: m.id,
  name: m.name || m.title || '',
  original_name: m.original_name || m.original_title || '',
  poster_path: m.poster_path,
})

export const NewTrailers = () => {
  const { t } = useTranslation()
  const user = useTypedSelector(state => state.user.user)
  const { fetchUpcomingMovies, setNotification } = useActions()
  const { upcoming } = useTypedSelector(state => state.movies)

  const [filmStatus, setFilmStatus] = useState<IFbFavouriteMovie | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUpcomingMovies()
  }, [])

  const movies = useMemo(() => {
    if (!upcoming || !upcoming.length) return null
    setIsLoading(false)
    const [first, ...rest] = upcoming
    return { first, rest }
  }, [upcoming])

  useEffect(() => {
    if (!user?.id || !movies?.first) return
    FirebaseApi.getFavouriteFilm({ userId: user.id, filmId: String(movies.first.id) }).then(setFilmStatus)
  }, [user?.id, movies?.first?.id])

  const movieRefs = useMemo(
    () =>
      movies?.rest.slice(0, TRAILER_POOL_SIZE).map(m => ({
        id: String(m.id),
        title: m.title || m.name || '',
      })) ?? [],
    [movies?.rest]
  )

  const trailers = useVideoTrailers(movieRefs)

  const sectionRef = useMainSectionReveal({ aboveFold: true, deps: [movies] })

  if (isLoading || !movies) return <NewTrailersSkeleton />

  const handleStatusToggle = async (status: IFilmStatus) => {
    if (!user) {
      setNotification(notificationList.userAbsent)
      return
    }
    const updated = await FirebaseApi.toggleFilmStatus({
      userId: user.id,
      film: toFbFilm(movies.first),
      filmStatus: status,
    })
    setFilmStatus(updated)
  }

  return (
    <section ref={sectionRef}>
      <SectionHeader
        title={t('main.newTrailers')}
        type={SectionHeaderType.ARROW}
        linkTitle={t('main.newTrailers')}
        moveToViaArrow={'collections/category'}
        state={{ title: t('main.nowPlaying'), category: 'up_coming' }}
        className={'mb-4 mt-7 md:mb-8 2xl:mb-20'}
      />
      <div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          poster={setMovieDBPath(movies.first.poster_path)}
          className={'w-full aspect-[368/198.87] md:aspect-[21/9] rounded-lg overflow-hidden object-cover'}
          src={'/'}
        />
      </div>
      <div className={'flex justify-between mb-4 md:mb-6 lg:mb-8 2xl:mb-11'}>
        <div className={'whitespace-nowrap flex flex-col items-center gap-2 md:flex-row md:gap-6'}>
          <Typography variant={'h4'} type={TypographyTypes.SUBTITLE}>
            {movies.first.title || movies.first.name}
          </Typography>
          <div className={'flex gap-4 md:w-full md:justify-between '}>
            <LinkedInIcon className={'fill-text-muted hover:fill-gold w-4 max-h-4'} />
            <InstagramIcon className={'fill-text-muted hover:fill-gold w-4 max-h-4'} />
            <FacebookIcon className={'fill-text-muted hover:fill-gold  w-4 max-h-4'} />
            <TwitterIcon className={'fill-text-muted hover:fill-gold w-4 max-h-4 '} />
          </div>
        </div>
        <div className={'flex items-center text-white gap-1 text-0.5rem'}>
          <IconBtn
            type={'like'}
            isActive={filmStatus?.status?.includes('liked')}
            onClick={() => handleStatusToggle('liked')}
          />
          <IconBtn
            type={'dislike'}
            isActive={filmStatus?.status?.includes('disliked')}
            onClick={() => handleStatusToggle('disliked')}
          />
        </div>
      </div>

      <VideoSlider slides={trailers} />
    </section>
  )
}
