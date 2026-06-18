import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { endpoints } from '../../../api'
import classnames from 'classnames'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'

interface LinksProps {
  className?: string
  onClick?: () => void
}
export const NavLinks = ({ className, onClick }: LinksProps) => {
  const user = useTypedSelector(state => state.user.user)
  const { t } = useTranslation()

  const navLinks = useMemo(
    () => [
      { id: '0', title: t('nav.main'), path: endpoints.main },
      { id: '1', title: t('nav.premiere'), path: endpoints.premiere },
      { id: '3', title: t('nav.films'), path: endpoints.films },
      { id: '4', title: t('nav.actors'), path: endpoints.actors },
      { id: '5', title: t('nav.news'), path: endpoints.news },
      { id: '6', title: t('nav.collections'), path: endpoints.collections },
      { id: '7', title: t('nav.myProfile'), path: endpoints.profile },
    ],
    [t]
  )

  return (
    <ul className={classnames('font-inter font-medium text-sm text-text-muted', [className])}>
      {navLinks.map(({ id, path, title }) => {
        if (!user && path === endpoints.profile) return null
        return (
          <li key={id}>
            <NavLink
              to={path}
              end={path === endpoints.main}
              onClick={onClick}
              className={({ isActive }) =>
                classnames('transition-colors duration-200', isActive ? 'text-gold' : 'hover:text-gold')
              }
            >
              {title}
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}
