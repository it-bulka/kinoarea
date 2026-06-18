import { useEffect } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { ReviewsList } from '../../../../components/ui/ReviewsList/ReviewsList'
import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import cls from '../../Profile.module.scss'
import { Button } from '../../../../components/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { endpoints } from '../../../../api'
import { useTranslation } from 'react-i18next'
import { ReviewsSkeleton } from '../../ProfileSkeletons'

export const UserReviews = () => {
  const { reviews, loading } = useTypedSelector(state => state.userReviews)
  const { fetchUserReviews } = useActions()
  const navigate = useNavigate()
  const user = useTypedSelector(state => state.user.user)
  const userLoading = useTypedSelector(state => state.user.loading)
  const { t } = useTranslation()

  useEffect(() => {
    if (user) fetchUserReviews(user.id)
  }, [fetchUserReviews, user])

  if (loading || userLoading) return <ReviewsSkeleton />

  if (!reviews || !reviews.length) {
    return (
      <>
        <div className={cls.titleWrapper}>
          <Typography variant="h2" type={TypographyTypes._TITLE} className={'text-center'}>
            {t('reviews.empty')}
          </Typography>
        </div>

        <Button variant="transparent" onClick={() => navigate(endpoints.main)} className={'mx-auto'}>
          {t('reviews.backToMain')}
        </Button>
      </>
    )
  }

  return (
    <>
      <div className={cls.titleWrapper}>
        <Typography variant="h2" type={TypographyTypes._TITLE}>
          {t('reviews.title')}
        </Typography>
        <p>{t('reviews.total', { count: reviews.length })}</p>
      </div>

      <ReviewsList type="user" list={reviews} setAsHtml />
    </>
  )
}
