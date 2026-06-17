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
import { useBgImage } from '../../hooks/useBgImage'
import siteBg from '@/assets/images/site-bg.png'

const isNavOpen = signal(false)

interface LayoutProps {
  children?: ReactNode
  noMailing?: boolean
}
export const Layout = ({ children, noMailing = false }: LayoutProps) => {
  const { getLoggedUser } = useActions()
  const currentLanguage = useTypedSelector(state => state.language.current)
  const bgLoaded = useBgImage(siteBg)
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
        <main className={'grow relative'}>
          <div
            className="absolute inset-0 bg-no-repeat opacity-40 pointer-events-none z-0"
            style={{ backgroundImage: `url(${siteBg})` }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            {children || <Outlet key={currentLanguage} context={{ bgLoaded }} />}
            {noMailing || <Mailing />}
          </div>
        </main>
        <Footer />
        <ScrollTopArrow />
      </div>
      <Notification />
    </ScrollRestoration>
  )
}
