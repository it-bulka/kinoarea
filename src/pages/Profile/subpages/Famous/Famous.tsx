import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import { Button } from '../../../../components/ui/Button/Button'
import { FbPersonList } from '../../../../components/ui/FbPersonList/FbPersonList'
import { endpoints } from '../../../../api'
import cls from '../../Profile.module.scss'

export const Famous = () => {
  const { persons } = useTypedSelector(state => state.userFavouritePersons)
  const user = useTypedSelector(state => state.user.user)
  const { fetchUserFavouritePersons } = useActions()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) fetchUserFavouritePersons(user.id)
  }, [fetchUserFavouritePersons, user])

  if (!persons.length) {
    return (
      <>
        <div className={cls.titleWrapper}>
          <Typography variant="h2" type={TypographyTypes._TITLE} className={'text-center'}>
            Вы пока-что не добавили ни одной знаменитости в избранное
          </Typography>
        </div>
        <Button variant="transparent" onClick={() => navigate(endpoints.actors)} className={'mx-auto'}>
          Перейти к актёрам
        </Button>
      </>
    )
  }

  return (
    <>
      <div className={cls.titleWrapper}>
        <Typography variant="h2" type={TypographyTypes._TITLE}>
          Избранные знаменитости
        </Typography>
        <p>Всего: {persons.length}</p>
      </div>
      <FbPersonList list={persons} />
    </>
  )
}
