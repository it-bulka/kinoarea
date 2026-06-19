import { Button } from '../../../../components/ui/Button/Button'
import { useActions } from '../../../../hooks/useActions'
import { useTranslation } from 'react-i18next'
import { AuthModal } from '../../../../components/ui/modals/AuthModal/AuthModal'
import { useEffect, useState, memo } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useNavigate } from 'react-router-dom'

export const AuthButton = memo(() => {
  const [isRegisterOpen, setRegisterModalOpen] = useState(false)
  const { user } = useTypedSelector(state => state.user)
  const authBy = useTypedSelector(state => state.authForm.authBy)
  const { addIncomingFriend, removeFetchedUser } = useActions()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (!user) return

    setRegisterModalOpen(false)

    if (authBy === 'register') {
      navigate('/profile/settings')
      addIncomingFriend(user.id, ['kinoarea', 'admin'])
    }
  }, [user])

  return (
    <>
      {user ? (
        <Button onClick={() => removeFetchedUser()} variant="ghost" size="sm">
          {t('header.logout')}
        </Button>
      ) : (
        <Button onClick={() => setRegisterModalOpen(true)} variant="primary" size="sm">
          {t('header.login')}
        </Button>
      )}

      <AuthModal isOpened={isRegisterOpen} close={() => setRegisterModalOpen(false)} size="max" />
    </>
  )
})

AuthButton.displayName = 'AuthButton'
