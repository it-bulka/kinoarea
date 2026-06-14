import { SectionHeader, SectionHeaderType } from '../../../../components/ui/SectionHeader/SectionHeader'
import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import { IconBtn } from '../../../../components/ui/IconBtn/IconBtn'
import { VideoSlider } from '../../../../components/ui/sliders/VideoSlider/VideoSlider'
import { useEffect, useMemo } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useVideoTrailers } from '../../../../hooks/useVideoTrailers'
import { ReactComponent as TwitterIcon } from '../../../../assets/images/general/icons8-twitter.svg'
import { ReactComponent as FacebookIcon } from '../../../../assets/images/general/facebook-f.svg'
import { ReactComponent as InstagramIcon } from '../../../../assets/images/general/instagram.svg'
import { ReactComponent as LinkedInIcon } from '../../../../assets/images/general/linkedin-in.svg'
import { setMovieDBPath } from '../../../../utils'
import { notificationList } from '../../../../mock/notificationList'

const TRAILER_POOL_SIZE = 8

export const NewTrailers = () => {
  const user = useTypedSelector(state => state.user.user)
  const { fetchUpcomingMovies, setNotification } = useActions()
  const { upcoming } = useTypedSelector(state => state.movies)

  useEffect(() => {
    fetchUpcomingMovies()
  }, [])

  const movies = useMemo(() => {
    if (!upcoming || !upcoming.length) return null
    const [first, ...rest] = upcoming
    return { first, rest }
  }, [upcoming])

  const movieRefs = useMemo(
    () =>
      movies?.rest.slice(0, TRAILER_POOL_SIZE).map(m => ({
        id: String(m.id),
        title: m.title || m.name || '',
      })) ?? [],
    [movies?.rest]
  )

  const trailers = useVideoTrailers(movieRefs)

  if (!movies) return null

  const onLikeClick = () => {
    if (!user) {
      setNotification(notificationList.userAbsent)
      return
    }
  }

  const onDislikeClick = () => {
    if (!user) {
      setNotification(notificationList.userAbsent)
      return
    }
  }

  return (
    <section>
      <SectionHeader
        title={'Новые трейлеры'}
        type={SectionHeaderType.ARROW}
        linkTitle={'Новые трейлеры'}
        moveToViaArrow={'collections/category'}
        state={{ title: 'Сейчас в кино', category: 'up_coming' }}
        className={'mb-4 mt-7 md:mb-8 2xl:mb-20'}
      />
      <div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          poster={setMovieDBPath(movies.first.poster_path)}
          className={'w-full aspect-[368/198.87] rounded-lg overflow-hidden object-cover'}
          src={'/'}
        />
      </div>
      <div className={'flex justify-between mb-4 md:mb-6 lg:mb-8 2xl:mb-11'}>
        <div className={'whitespace-nowrap flex flex-col items-center gap-2 md:flex-row md:gap-6'}>
          <Typography variant={'h4'} type={TypographyTypes.SUBTITLE}>
            {movies.first.title || movies.first.name}
          </Typography>

          <div className={'flex gap-4 md:w-full md:justify-between '}>
            <LinkedInIcon className={'fill-grayIcon hover:fill-white w-4 max-h-4'} />
            <InstagramIcon className={'fill-grayIcon hover:fill-white w-4 max-h-4'} />
            <FacebookIcon className={'fill-grayIcon hover:fill-white  w-4 max-h-4'} />
            <TwitterIcon className={'fill-grayIcon hover:fill-white w-4 max-h-4 '} />
          </div>
        </div>
        <div className={'flex items-center text-white gap-1 text-0.5rem'}>
          <div>
            <IconBtn type={'like'} onClick={onLikeClick} />
            <p className={'text-center'}>3 245</p>
          </div>
          <div>
            <IconBtn type={'dislike'} onClick={onDislikeClick} />
            <p className={'text-center'}>420</p>
          </div>
        </div>
      </div>

      <VideoSlider slides={trailers} />
    </section>
  )
}
