import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Logo } from '../../../../components/ui/Logo/Logo'
import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import { ProfilePages } from '../../../../router/paths'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { ProfileAvatar } from './ProfileAvatar'
import { ProfileInfo } from './ProfileInfo'
import { ProfileMainSkeleton } from '../../ProfileSkeletons'
import cls from './ProfileMain.module.scss'

import { ReactComponent as SettingsIcon } from '../../../../assets/images/general/settings.svg'

export const ProfileMain = () => {
  const { user, loading } = useTypedSelector(state => state.user)
  const { t } = useTranslation()

  useEffect(() => {
    const name = user?.name ? `${user.name} — ` : ''
    document.title = `${name}${t('profile.title')} | Kinoarea`
    return () => {
      document.title = 'Kinoarea'
    }
  }, [user?.name, t])

  if (loading || !user) return <ProfileMainSkeleton />

  return (
    <article className={cls.spotlight}>
      <Typography variant="h1" type={TypographyTypes._TITLE} className="mb-6">
        {t('profile.title')}
      </Typography>

      <div className={cls.contentGrid}>
        <ProfileAvatar user={user} />

        <div className={cls.divider} aria-hidden="true" />

        <ProfileInfo user={user} t={t} />

        <div className={cls.divider} aria-hidden="true" />

        <aside className={cls.settingsPanel} aria-label="Settings panel">
          <Logo classes="[&_svg]:w-10" />
          <Link to={ProfilePages.setting} className={cls.settingsPanelBtn}>
            <SettingsIcon className="w-3.5 h-3.5 shrink-0" />
            {t('profile.settingsPanel.button')}
          </Link>
        </aside>
      </div>
    </article>
  )
}
