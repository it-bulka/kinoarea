import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Timestamp } from 'firebase/firestore'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useProfileComments } from './useProfileComments'
import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import { Button } from '../../../../components/ui/Button/Button'
import { Spinner } from '../../../../components/ui/Spinner/Spinner'
import { AbsentImg } from '../../../../components/ui/AbsentImg/AbsentImg'
import { getDate, setMovieDBPath } from '../../../../utils'
import { endpoints } from '../../../../api'
import { Paths } from '../../../../router/paths'
import type { IUserReview } from '../../../../api/types/responses'
import cls from '../../Profile.module.scss'

const CommentCard = ({
  review,
  onDelete,
  onNavigate,
}: {
  review: IUserReview
  onDelete: (id: string) => void
  onNavigate: (id: string | number) => void
}) => {
  const { t } = useTranslation()
  const timestamp = review.created_at instanceof Date ? review.created_at : (review.created_at as Timestamp).toDate()
  const posterSrc = review.movie?.poster
    ? review.movie.poster.startsWith('/')
      ? setMovieDBPath(review.movie.poster)
      : review.movie.poster
    : ''

  return (
    <article className={'flex gap-4 border border-noir-border rounded-10 p-4 bg-noir-card'}>
      <button
        onClick={() => onNavigate(review.movie.id)}
        className={'w-16 h-24 rounded-5 overflow-hidden flex-shrink-0 cursor-pointer'}
        aria-label={review.movie?.name}
      >
        {posterSrc ? (
          <img src={posterSrc} alt={review.movie?.name} className={'w-full h-full object-cover'} />
        ) : (
          <AbsentImg className={'w-full h-full'} />
        )}
      </button>

      <div className={'flex-1 min-w-0'}>
        <div className={'flex justify-between items-start gap-2'}>
          <button
            onClick={() => onNavigate(review.movie.id)}
            className={
              'font-inter font-semibold text-sm text-text-base hover:text-gold transition-colors text-left truncate'
            }
          >
            {review.movie?.name}
          </button>
          <button
            onClick={() => onDelete(review.id)}
            className={'text-text-muted hover:text-red-400 transition-colors text-xs font-inter flex-shrink-0'}
          >
            {t('comments.delete')}
          </button>
        </div>

        <time className={'text-xs text-text-muted block mt-1 mb-2'} dateTime={getDate(timestamp)}>
          {getDate(timestamp)}
        </time>

        <div
          className={'text-sm text-text-base font-inter line-clamp-3'}
          dangerouslySetInnerHTML={{ __html: review.content }}
        />
      </div>
    </article>
  )
}

export const UserComments = () => {
  const user = useTypedSelector(state => state.user.user)
  const { comments, isLoading, hasMore, loadMore, deleteComment } = useProfileComments(user?.id)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleNavigateToFilm = useCallback(
    (movieId: string | number) => {
      navigate(Paths.film.detail(movieId))
    },
    [navigate]
  )

  if (!isLoading && (!comments || comments.length === 0)) {
    return (
      <>
        <div className={cls.titleWrapper}>
          <Typography variant="h2" type={TypographyTypes._TITLE} className={'text-center'}>
            {t('comments.empty')}
          </Typography>
        </div>
        <Button variant="transparent" onClick={() => navigate(endpoints.main)} className={'mx-auto'}>
          {t('comments.backToMain')}
        </Button>
      </>
    )
  }

  return (
    <>
      <div className={cls.titleWrapper}>
        <Typography variant="h2" type={TypographyTypes._TITLE}>
          {t('comments.title')}
        </Typography>
        <p className={'font-inter text-text-muted text-sm'}>{t('comments.total', { count: comments.length })}</p>
      </div>

      <div className={'flex flex-col gap-3'}>
        {comments.map(review => (
          <CommentCard key={review.id} review={review} onDelete={deleteComment} onNavigate={handleNavigateToFilm} />
        ))}
      </div>

      {isLoading && (
        <div className={'flex justify-center py-6'}>
          <Spinner className={'w-8 h-8 text-gold'} />
        </div>
      )}

      {hasMore && !isLoading && comments.length > 0 && (
        <Button variant="ghost" onClick={loadMore} className={'mx-auto mt-6'}>
          {t('reviewsList.loadMore')}
        </Button>
      )}
    </>
  )
}
