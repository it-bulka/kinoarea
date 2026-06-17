import classnames from 'classnames'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'
import { Logo } from '../../components/ui/Logo/Logo'
import { ProfilePages } from '../../router/paths'
import siteBg from '@/assets/images/site-bg.png'
import cls from './Profile.module.scss'

import { ReactComponent as HomeIcon } from '../../assets/images/general/home.svg'
import { ReactComponent as FriendIcon } from '../../assets/images/general/friend.svg'
import { ReactComponent as ReviewIcon } from '../../assets/images/general/review.svg'
import { ReactComponent as LikesIcon } from '../../assets/images/general/likes.svg'
import { ReactComponent as CommentsIcon } from '../../assets/images/general/comments.svg'
import { ReactComponent as FilmsIcon } from '../../assets/images/general/films.svg'
import { ReactComponent as FamousIcon } from '../../assets/images/general/famous.svg'
import { ReactComponent as SettingsIcon } from '../../assets/images/general/settings.svg'

const navBtns = [
  { id: 1, path: ProfilePages.main, icon: <HomeIcon />, labelKey: 'profile.nav.home' },
  { id: 2, path: ProfilePages.friends, icon: <FriendIcon />, labelKey: 'profile.nav.friends' },
  { id: 3, path: ProfilePages.reviews, icon: <ReviewIcon />, labelKey: 'profile.nav.reviews' },
  { id: 4, path: ProfilePages.likes, icon: <LikesIcon />, labelKey: 'profile.nav.likes' },
  { id: 5, path: ProfilePages.comments, icon: <CommentsIcon />, labelKey: 'profile.nav.comments' },
  { id: 6, path: ProfilePages.films, icon: <FilmsIcon />, labelKey: 'profile.nav.films' },
  { id: 7, path: ProfilePages.famous, icon: <FamousIcon />, labelKey: 'profile.nav.famous' },
]

export const Profile = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const checkActive = (itemPath: string) => pathname === itemPath

  return (
    <div style={{ backgroundImage: `url(${siteBg})` }} className="bg-no-repeat">
      <div className={cls.profileLayout}>
        <aside className={cls.sidebar} aria-label="Profile navigation">
          <Logo classes={cls.sidebarLogo} />

          <nav className={cls.sidebarNav}>
            {navBtns.map(item => (
              <Link
                key={item.id}
                to={item.path}
                className={twMerge(classnames(cls.navItem, { [cls.navItemActive]: checkActive(item.path) }))}
                title={t(item.labelKey)}
              >
                <span className={cls.navIcon}>{item.icon}</span>
                <span className={cls.navLabel}>{t(item.labelKey)}</span>
              </Link>
            ))}
          </nav>

          <Link
            to={ProfilePages.setting}
            className={twMerge(
              classnames(cls.navItem, cls.navSettingsItem, { [cls.navItemActive]: checkActive(ProfilePages.setting) })
            )}
            title={t('profile.nav.settings')}
          >
            <span className={cls.navIcon}>
              <SettingsIcon />
            </span>
            <span className={cls.navLabel}>{t('profile.nav.settings')}</span>
          </Link>
        </aside>

        <div className={cls.profileContent}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
