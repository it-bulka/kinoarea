import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import { Button } from '../../../../components/ui/Button/Button'
import { FbFilmList } from '../../../../components/ui/FbFilmList/FbFilmList'
import { endpoints } from '../../../../api'
import cls from '../../Profile.module.scss'

export const Likes = () => {
  const { films } = useTypedSelector(state => state.userFavouriteFilms)
  const user = useTypedSelector(state => state.user.user)
  const { fetchUserFavouriteFilms } = useActions()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) fetchUserFavouriteFilms(user.id, 'liked')
  }, [fetchUserFavouriteFilms, user])

  if (!films.length) {
    return (
      <>
        <div className={cls.titleWrapper}>
          <Typography variant="h2" type={TypographyTypes._TITLE} className={'text-center'}>
            Вы пока-что не лайкнули ни одного фильма
          </Typography>
        </div>
        <Button variant="transparent" onClick={() => navigate(endpoints.main)} className={'mx-auto'}>
          Вернуться на главную страницу
        </Button>
      </>
    )
  }

  return (
    <>
      <div className={cls.titleWrapper}>
        <Typography variant="h2" type={TypographyTypes._TITLE}>
          Лайкнутые фильмы
        </Typography>
        <p>Всего: {films.length}</p>
      </div>
      <FbFilmList list={films} />
    </>
  )
}
