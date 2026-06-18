import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import { Button } from '../../../../components/ui/Button/Button'
import { FbPersonList } from '../../../../components/ui/FbPersonList/FbPersonList'
import { endpoints } from '../../../../api'
import cls from '../../Profile.module.scss'
import { useTranslation } from 'react-i18next'
import { FamousSkeleton } from '../../ProfileSkeletons'

export const Famous = () => {
  const { persons, loading } = useTypedSelector(state => state.userFavouritePersons)
  const user = useTypedSelector(state => state.user.user)
  const userLoading = useTypedSelector(state => state.user.loading)
  const { fetchUserFavouritePersons } = useActions()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (user) fetchUserFavouritePersons(user.id)
  }, [fetchUserFavouritePersons, user])

  if (loading || userLoading) return <FamousSkeleton />

  if (!persons.length) {
    return (
      <>
        <div className={cls.titleWrapper}>
          <Typography variant="h2" type={TypographyTypes._TITLE} className={'text-center'}>
            {t('famous.empty')}
          </Typography>
        </div>
        <Button variant="transparent" onClick={() => navigate(endpoints.actors)} className={'mx-auto'}>
          {t('famous.goToActors')}
        </Button>
      </>
    )
  }

  return (
    <>
      <div className={cls.titleWrapper}>
        <Typography variant="h2" type={TypographyTypes._TITLE}>
          {t('famous.title')}
        </Typography>
        <p>{t('famous.total', { count: persons.length })}</p>
      </div>
      <FbPersonList list={persons} />
    </>
  )
}
