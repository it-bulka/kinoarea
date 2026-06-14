import { Button } from '../Button/Button'
import classnames from 'classnames'
import cls from './Header.module.scss'
import { ReactComponent as BurgerIcon } from '@/assets/images/general/burger.svg'
import { ReactComponent as SearchIcon } from '@/assets/images/general/search.svg'
import { ReactComponent as LinkedInIcon } from '@/assets/images/general/linkedin-in.svg'
import { ReactComponent as InstagramIcon } from '@/assets/images/general/instagram.svg'
import { ReactComponent as FacebookIcon } from '@/assets/images/general/facebook-f.svg'
import { ReactComponent as TwitterIcon } from '@/assets/images/general/icons8-twitter.svg'
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

  useEffect(() => {
    if (!user) return

    setRegisterModalOpen(false)

    if (authBy === 'register') {
      navigate('/profile/settings')
      /* Default friends */
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

  const logOut = () => {
    removeFetchedUser()
  }

  const handleLanguageToggle = () => {
    const next: LanguageCode = currentLanguage === 'uk-UA' ? 'en-US' : 'uk-UA'
    setLanguage(next)
  }

  return (
    <header className={'flex py-[11px] container relative'}>
      <div className={'hidden xl:block lg:flex-1'}>
        <NavLinks className={`xl:flex xl:justify-between gap-0.5 xl:max-w-[760px] xl:m-auto xl:font-base`} />
      </div>
      <div className={'flex gap-1 items-center'}>
        <Button onClick={onMenu} variant={'icon'} className={'md:hidden'}>
          <BurgerIcon className={'fill-blue'} />
        </Button>

        <div className={'relative'}>
          <Button onClick={openSearch} variant={'icon'}>
            <SearchIcon />
          </Button>
        </div>
        {isSearchShown && <SearchFilm className={'fixed inset-0'} onClose={closeSearch} />}

        <button
          onClick={handleLanguageToggle}
          className={'text-xs font-semibold text-grayIcon hover:text-white transition-colors px-1'}
          title={currentLanguage === 'uk-UA' ? 'Switch to English' : 'Перемкнути на українську'}
        >
          {currentLanguage === 'uk-UA' ? 'UA' : 'EN'}
        </button>
      </div>
      <div className={'flex-1 flex justify-center items-center xl:order-first xl:justify-normal xl:grow-0'}>
        <div>
          <Logo classes={'mb-2'} />
          <div className={classnames('flex gap-0.5 md:w-full md:justify-between ', cls.socials)}>
            <LinkedInIcon className={'fill-grayIcon hover:fill-white'} />
            <InstagramIcon className={'fill-grayIcon hover:fill-white'} />
            <FacebookIcon className={'fill-grayIcon hover:fill-white'} />
            <TwitterIcon className={'fill-grayIcon hover:fill-white'} />
          </div>
        </div>
      </div>
      <div className={'lg:ml-6'}>
        {user ? (
          <Button onClick={() => logOut()}>Выйти</Button>
        ) : (
          <Button onClick={() => setRegisterModalOpen(true)}>Войти</Button>
        )}
      </div>
      <AuthModal isOpened={isRegisterOpen} close={() => setRegisterModalOpen(false)} />
    </header>
  )
}
