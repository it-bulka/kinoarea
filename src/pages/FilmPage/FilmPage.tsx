import { useParams } from 'react-router-dom'
import { WithErrorBoundary } from '../../components/ui/ErrorFallback'
import { FilmHero } from './sections/FilmHero/FilmHero'
import { FilmHeroSkeleton } from './sections/FilmHeroSkeleton'
import { FilmCast } from './sections/FilmCast/FilmCast'
import { FilmPosters } from './sections/FilmPosters/FilmPosters'
import { FilmSimilar } from './sections/FilmSimilar/FilmSimilar'
import { FilmReviews } from './sections/FilmReviews/FilmReviews'
import { FilmVideos } from './sections/FilmVideos/FilmVideos'
import { useFilmPage } from './hooks/useFilmPage'
import { useMovieReviews } from './hooks/useMovieReviews'
import { setMovieDBPath } from '../../utils'

export const FilmPage = () => {
  const { slug } = useParams()
  const {
    details,
    cast,
    posters,
    tmdbReviews,
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

  const { movieReviews, isLoadingReviews, hasMoreReviews, loadMoreReviews, prependReview } = useMovieReviews(slug)

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

        <WithErrorBoundary>
          <FilmCast slug={slug!} cast={cast} isLoading={isLoading} />
        </WithErrorBoundary>

        <WithErrorBoundary>
          <FilmPosters slug={slug!} posters={posters} isLoading={isLoading} />
        </WithErrorBoundary>

        <WithErrorBoundary>
          <FilmSimilar slug={slug!} similar={similar} isLoading={isLoading} />
        </WithErrorBoundary>

        <WithErrorBoundary>
          <FilmReviews
            details={details}
            user={user}
            isCommentBlockShown={isCommentBlockShown}
            onAddComment={addComment}
            tmdbReviews={tmdbReviews}
            isPageLoading={isLoading}
            movieReviews={movieReviews}
            isLoadingReviews={isLoadingReviews}
            hasMoreReviews={hasMoreReviews}
            onLoadMore={loadMoreReviews}
            onReviewSent={prependReview}
          />
        </WithErrorBoundary>

        <WithErrorBoundary>
          <FilmVideos slug={slug!} videos={videos} isLoading={isLoading} onVideoSelect={handleVideoSelect} />
        </WithErrorBoundary>
      </div>
    </>
  )
}
