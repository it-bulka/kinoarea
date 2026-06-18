import { IReview, IUserReview } from '../../../api/types/responses'
import { memo, ReactEventHandler, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../Button/Button'
import AvatarIcon from '../../../assets/images/general/avatar.svg'
import { type ReviewType, Review } from '../Review/Review'

interface ReviewsListProps {
  type?: ReviewType
  list: IUserReview[] | IReview[]
  setAsHtml?: boolean
  onDelete?: (reviewId: string) => void
}

export const ReviewsList = memo(({ list, type = 'movie', setAsHtml = false, onDelete }: ReviewsListProps) => {
  const [isAllShown, setAllShown] = useState(false)
  const { t } = useTranslation()

  const reviews = useMemo(() => {
    const maxAmount = 3
    if (list.length > maxAmount) {
      return {
        start: list.slice(0, maxAmount),
        rest: list.slice(maxAmount),
      }
    }

    return null
  }, [list])

  const hangleImgError: ReactEventHandler<HTMLImageElement> = e => {
    const element = e.currentTarget
    element.onerror = null
    element.src = AvatarIcon
  }

  return (
    <div>
      {(reviews?.start || list).map(item => (
        <Review
          item={item}
          key={item.id}
          handleImgError={hangleImgError}
          type={type}
          htmlContent={setAsHtml ? item.content : undefined}
          onDelete={onDelete}
        />
      ))}

      {isAllShown &&
        reviews?.rest?.map(item => (
          <Review
            item={item}
            key={item.id}
            handleImgError={hangleImgError}
            type={type}
            htmlContent={setAsHtml ? item.content : undefined}
            onDelete={onDelete}
          />
        ))}

      {reviews?.rest && (
        <Button onClick={() => setAllShown(prev => !prev)} className={'mx-auto'}>
          {isAllShown ? t('reviewsList.showLess') : t('reviewsList.showMore')}
        </Button>
      )}
    </div>
  )
})

ReviewsList.displayName = 'ReviewsList'
