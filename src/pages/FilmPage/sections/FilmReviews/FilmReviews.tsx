import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import { ReviewsList } from '../../../../components/ui/ReviewsList/ReviewsList'
import { Button } from '../../../../components/ui/Button/Button'
import { Comment } from '../../../../components/ui/Comment/Comment'
import { FilmReviewsSkeleton } from '../FilmReviewsSkeleton'
import type { IReview, IUserReview, IUser, IMovieDetailsRes } from '../../../../api/types/responses'

interface FilmReviewsProps {
  details: IMovieDetailsRes | null
  user: IUser | null
  isCommentBlockShown: boolean
  onAddComment: () => void
  tmdbReviews: IReview[]
  isPageLoading: boolean
  movieReviews: IUserReview[]
  isLoadingReviews: boolean
  hasMoreReviews: boolean
  onLoadMore: () => void
  onReviewSent: (review: IUserReview) => void
}

export const FilmReviews = memo(
  ({
    details,
    user,
    isCommentBlockShown,
    onAddComment,
    tmdbReviews,
    isPageLoading,
    movieReviews,
    isLoadingReviews,
    hasMoreReviews,
    onLoadMore,
    onReviewSent,
  }: FilmReviewsProps) => {
    const { t } = useTranslation()

    const movie = useMemo(
      () => ({
        id: details?.id || '',
        name: details?.title || '',
        poster: details?.poster_path || '',
      }),
      [details?.id, details?.title, details?.poster_path]
    )

    const noReviews = movieReviews.length === 0 && !isLoadingReviews && tmdbReviews.length === 0 && !isPageLoading

    return (
      <section>
        <div className={'mb-5 mt-24 md:flex md:justify-between'}>
          <Typography variant={'h3'} type={TypographyTypes._TITLE} className={'mx-auto w-max mb-[54px] md:m-0'}>
            {t('film.reviews')}
          </Typography>
          <Button className={'mx-auto md:m-0'} onClick={onAddComment}>
            {isCommentBlockShown ? t('film.hideReview') : t('film.addReview')}
          </Button>
        </div>

        {user && isCommentBlockShown && (
          <Comment
            userImg={user.img || ''}
            userName={user.name}
            userSurname={user.surname || ''}
            userId={user.id}
            movie={movie}
            onReviewSent={onReviewSent}
            className={'mb-4'}
          />
        )}

        {movieReviews.length > 0 && <ReviewsList list={movieReviews} type="film-user" setAsHtml />}

        {isLoadingReviews && <FilmReviewsSkeleton />}

        {hasMoreReviews && !isLoadingReviews && movieReviews.length > 0 && (
          <Button variant="ghost" onClick={onLoadMore} className={'mx-auto mt-4'}>
            {t('reviewsList.loadMore')}
          </Button>
        )}

        {noReviews && (
          <p className={'text-center text-text-muted py-8 font-inter text-sm'}>{t('reviewsList.noReviews')}</p>
        )}

        {isPageLoading ? <FilmReviewsSkeleton /> : tmdbReviews.length > 0 && <ReviewsList list={tmdbReviews} />}
      </section>
    )
  }
)

FilmReviews.displayName = 'FilmReviews'
