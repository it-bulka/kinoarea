import { memo, ReactEventHandler, useMemo } from 'react'
import { IReview, IUserReview } from '../../../api/types/responses'
import cls from './Review.module.scss'
import { getDate, setMovieDBPath } from '../../../utils'
import { Timestamp } from 'firebase/firestore'
import { useTranslation } from 'react-i18next'

export type ReviewType = 'user' | 'movie' | 'film-user'

interface ReviewProps {
  type: ReviewType
  item: IUserReview | IReview
  handleImgError?: ReactEventHandler<HTMLImageElement>
  htmlContent?: string
  onDelete?: (reviewId: string) => void
}

export const Review = memo(({ item, handleImgError, type, htmlContent, onDelete }: ReviewProps) => {
  const { t } = useTranslation()

  const { headerEl, dateStr } = useMemo(() => {
    if (type === 'movie') {
      const { author_details, created_at } = item as IReview
      const date = created_at instanceof Date ? created_at : new Date(created_at as unknown as string)
      return {
        headerEl: (
          <div className={cls.headerWrapper}>
            <img
              src={setMovieDBPath(author_details.avatar_path)}
              alt={author_details.username}
              className={cls.avatar}
              onError={handleImgError}
            />
            <span className={cls.name}>{author_details.username}</span>
          </div>
        ),
        dateStr: getDate(date),
      }
    }

    const { created_at } = item as IUserReview
    const timestamp = created_at instanceof Date ? created_at : (created_at as Timestamp).toDate()

    if (type === 'film-user') {
      const { author_details } = item as IUserReview
      return {
        headerEl: (
          <div className={cls.headerWrapper}>
            <img
              src={author_details.avatar_path}
              alt={author_details.name}
              className={cls.avatar}
              onError={handleImgError}
            />
            <span className={cls.name}>{author_details.name || author_details.username}</span>
          </div>
        ),
        dateStr: getDate(timestamp),
      }
    }

    const { movie } = item as IUserReview
    return {
      headerEl: (
        <div className={cls.headerWrapper}>
          <img src={movie?.poster} alt={movie?.name} className={cls.poster} onError={handleImgError} />
          <span className={cls.name}>{movie?.name}</span>
        </div>
      ),
      dateStr: getDate(timestamp),
    }
  }, [item, type, handleImgError])

  return (
    <article
      className={'rounded-10 border border-noir-border border-l-2 border-l-gold/30 px-4 pt-3 pb-4 mb-4 bg-noir-card'}
    >
      <div className={'flex-between'}>
        {headerEl}
        {onDelete && (
          <button
            onClick={() => onDelete(item.id)}
            className={'text-text-muted hover:text-red-400 transition-colors text-xs font-inter ml-2 flex-shrink-0'}
            aria-label={t('comments.delete')}
          >
            {t('comments.delete')}
          </button>
        )}
      </div>
      <time className={cls.time} dateTime={dateStr}>
        {dateStr}
      </time>
      {htmlContent ? (
        <p
          className={'text-sm md:text-base font-inter text-text-base'}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : (
        <p className={'text-sm md:text-base font-inter text-text-base'}>{item.content}</p>
      )}
    </article>
  )
})

Review.displayName = 'Review'
