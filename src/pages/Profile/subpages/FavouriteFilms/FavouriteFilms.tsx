import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import { Button } from '../../../../components/ui/Button/Button'
import { FbFilmList } from '../../../../components/ui/FbFilmList/FbFilmList'
import { endpoints } from '../../../../api'
import cls from '../../Profile.module.scss'
import { useTranslation } from 'react-i18next'

export const FavouriteFilms = () => {
  const { films } = useTypedSelector(state => state.userFavouriteFilms)
  const user = useTypedSelector(state => state.user.user)
  const { fetchUserFavouriteFilms } = useActions()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (user) fetchUserFavouriteFilms(user.id, 'favourite')
  }, [fetchUserFavouriteFilms, user])

  if (!films.length) {
    return (
      <>
        <div className={cls.titleWrapper}>
          <Typography variant="h2" type={TypographyTypes._TITLE} className={'text-center'}>
            {t('favouriteFilms.empty')}
          </Typography>
        </div>
        <Button variant="transparent" onClick={() => navigate(endpoints.main)} className={'mx-auto'}>
          {t('favouriteFilms.backToMain')}
        </Button>
      </>
    )
  }

  return (
    <>
      <div className={cls.titleWrapper}>
        <Typography variant="h2" type={TypographyTypes._TITLE}>
          {t('favouriteFilms.title')}
        </Typography>
        <p>{t('favouriteFilms.total', { count: films.length })}</p>
      </div>
      <FbFilmList list={films} />
    </>
  )
}
