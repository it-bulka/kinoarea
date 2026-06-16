import { signal } from '@preact/signals-react'
import { ReactNode, useCallback, useEffect } from 'react'
import { Header } from '../ui/Header/Header'
import { Navigation } from '../ui/Navigation/Navigation'
import { Outlet } from 'react-router-dom'
import { Footer } from '../ui/Footer/Footer'
import { Mailing } from '../ui/Mailing/Mailing'
import { ScrollTopArrow } from '../ui/ScrollTopArrow/ScrollTopArrow'
import { ScrollRestoration } from '../ui/ScrollRestoration/ScrollRestoration'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Notification } from '../ui/modals/Notification/Notification'

const isNavOpen = signal(false)

interface LayoutProps {
  children?: ReactNode
  noMailing?: boolean
}
export const Layout = ({ children, noMailing = false }: LayoutProps) => {
  const { getLoggedUser } = useActions()
  const currentLanguage = useTypedSelector(state => state.language.current)
  const onNavClose = useCallback(() => {
    isNavOpen.value = false
  }, [])

  const onMenuClick = useCallback(() => {
    isNavOpen.value = true
  }, [])

  useEffect(() => {
    getLoggedUser()
  }, [])

  return (
    <ScrollRestoration>
      <div className="App bg-noir flex flex-col min-h-screen">
        <Header onMenu={onMenuClick} />
        <Navigation isOpen={isNavOpen.value} onClose={onNavClose} />
        <main className={'grow'}>
          {children || <Outlet key={currentLanguage} />}
          {noMailing || <Mailing />}
        </main>
        <Footer />
        <ScrollTopArrow />
      </div>
      <Notification />
    </ScrollRestoration>
  )
}
