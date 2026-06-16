import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SectionHeader, SectionHeaderType } from '../../components/ui/SectionHeader/SectionHeader'
import { CastList } from '../../components/ui/CastList/CastList'
import { PostersList } from '../../components/ui/PostersList/PostersList'
import { Typography, TypographyTypes } from '../../components/ui/Typography/Typography'
import { FilmSlider } from '../../components/ui/sliders/FilmSlider/FilmSlider'
import { SliderNav } from '../../components/ui/sliders/SliderNav/SliderNav'
import { ReviewsList } from '../../components/ui/ReviewsList/ReviewsList'
import { Button } from '../../components/ui/Button/Button'
import { Comment } from '../../components/ui/Comment/Comment'
import { FilmVideos } from './sections/FilmVideos/FilmVideos'
import { FilmHero } from './sections/FilmHero/FilmHero'
import { FilmHeroSkeleton } from './sections/FilmHeroSkeleton'
import { FilmCastSkeleton } from './sections/FilmCastSkeleton'
import { FilmPostersSkeleton } from './sections/FilmPostersSkeleton'
import { FilmSimilarSkeleton } from './sections/FilmSimilarSkeleton'
import { FilmReviewsSkeleton } from './sections/FilmReviewsSkeleton'
import { useFilmPage } from './hooks/useFilmPage'
import { setMovieDBPath } from '../../utils'
import { Paths } from '../../router/paths'

export const FilmPage = () => {
  const { slug } = useParams()
  const { t } = useTranslation()
  const {
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
  } = useFilmPage(slug)

  return (
    <>
      {details && (
        <div
          style={{ backgroundImage: `url(${setMovieDBPath(details.backdrop_path || details.poster_path)})` }}
          className={'bg-no-repeat bg-cover bg-top absolute w-full aspect-[3/4] left-0 -z-1 opacity-40'}
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
          <FilmHero
            details={details}
            isModalOpen={isModalOpen}
            trailerKey={trailerKey}
            favouriteFilm={favouriteFilm}
            onPlay={handlePlay}
            onCloseModal={closeModal}
            onLike={onLikeClick}
            onDislike={onDislikeClick}
            onFavourite={onFavouriteClick}
          />
        )}

        <section>
          <SectionHeader
            title={t('film.cast')}
            type={SectionHeaderType.ARROW}
            linkTitle={t('film.allActors')}
            moveToViaArrow={Paths.film.actors(slug!)}
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
          {isLoading ? <FilmPostersSkeleton /> : <PostersList list={posters} />}
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
