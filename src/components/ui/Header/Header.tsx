import { Button } from '../Button/Button'
import { ReactComponent as BurgerIcon } from '@/assets/images/general/burger.svg'
import { ReactComponent as SearchIcon } from '@/assets/images/general/search.svg'
import { Logo } from '../Logo/Logo'
import { NavLinks } from '../NavLinks/NavLinks'
import { AuthModal } from '../modals/AuthModal/AuthModal'
import { useEffect, useState } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { SearchFilm } from '../SearchFilm/SearchFilm'
import { scrollBody } from '../../../utils/scrollBody'
import { useActions } from '../../../hooks/useActions'
import { useNavigate } from 'react-router-dom'
import type { LanguageCode } from '../../../redux/actionsTypes/language'
import { useTranslation } from 'react-i18next'

interface HeaderProps {
  onMenu?: () => void
}

export const Header = ({ onMenu }: HeaderProps) => {
  const [isRegisterOpen, setRegisterModalOpen] = useState(false)
  const [isSearchShown, setSearchShown] = useState(false)
  const { user } = useTypedSelector(state => state.user)
  const authBy = useTypedSelector(state => state.authForm.authBy)
  const currentLanguage = useTypedSelector(state => state.language.current)
  const { removeFetchedUser, addIncomingFriend, setLanguage } = useActions()
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

  const openSearch = () => {
    scrollBody.stop()
    setSearchShown(true)
  }

  const closeSearch = () => {
    scrollBody.allow()
    setSearchShown(false)
  }

  const handleLanguageToggle = () => {
    const next: LanguageCode = currentLanguage === 'uk-UA' ? 'en-US' : 'uk-UA'
    setLanguage(next)
  }

  return (
    <header className="flex items-center justify-between py-3 container border-b border-noir-border">
      {/* Logo — far left */}
      <Logo />

      {/* Nav links — desktop only */}
      <NavLinks className="hidden xl:flex items-center gap-7" />

      {/* Controls — far right */}
      <div className="flex items-center gap-2">
        <Button onClick={onMenu} variant="icon" className="xl:hidden">
          <BurgerIcon />
        </Button>

        <Button onClick={openSearch} variant="icon">
          <SearchIcon />
        </Button>

        <button
          onClick={handleLanguageToggle}
          className="text-xs font-inter font-semibold text-text-muted hover:text-gold transition-colors px-1"
          title={t('header.switchToEn')}
        >
          {currentLanguage === 'uk-UA' ? 'UA' : 'EN'}
        </button>

        {user ? (
          <Button onClick={() => removeFetchedUser()} variant="ghost" size="sm">
            {t('header.logout')}
          </Button>
        ) : (
          <Button onClick={() => setRegisterModalOpen(true)} variant="primary" size="sm">
            {t('header.login')}
          </Button>
        )}
      </div>

      {isSearchShown && <SearchFilm className="fixed inset-0" onClose={closeSearch} />}
      <AuthModal isOpened={isRegisterOpen} close={() => setRegisterModalOpen(false)} />
    </header>
  )
}
