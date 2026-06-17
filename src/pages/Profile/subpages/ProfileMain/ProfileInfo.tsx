import { memo } from 'react'
import type { TFunction } from 'i18next'
import { getDate, getGenres } from '../../../../utils'
import type { IUser } from '../../../../api/types/responses'
import type { GenreIds } from '../../../../mock/types'
import cls from './ProfileMain.module.scss'

interface ProfileInfoProps {
  user: IUser | null
  t: TFunction
}

export const ProfileInfo = memo(({ user, t }: ProfileInfoProps) => (
  <div className={cls.infoCol}>
    {user?.about && <p className={cls.aboutText}>{user.about}</p>}

    <div className={cls.fieldsGrid}>
      <div className={cls.fieldGroup}>
        <label className={cls.fieldLabel}>{t('settings.name')}</label>
        <input
          readOnly
          value={[user?.name, user?.surname].filter(Boolean).join(' ') || t('profile.notSpecified')}
          className="input input-padding w-full"
        />
      </div>

      <div className={cls.fieldGroup}>
        <label className={cls.fieldLabel}>{t('profile.sex')}</label>
        <input readOnly value={user?.sex || t('profile.notSpecified')} className="input input-padding w-full" />
      </div>

      <div className={cls.fieldGroup}>
        <label className={cls.fieldLabel}>{t('profile.birthday')}</label>
        <input
          readOnly
          value={user?.birthday ? getDate(user.birthday.toDate()) : t('profile.notSpecified')}
          className="input input-padding w-full"
        />
      </div>

      <div className={cls.fieldGroup}>
        <label className={cls.fieldLabel}>{t('profile.country')}</label>
        <input readOnly value={user?.country || t('profile.notSpecified')} className="input input-padding w-full" />
      </div>

      <div className={cls.fieldGroup}>
        <label className={cls.fieldLabel}>{t('profile.city')}</label>
        <input readOnly value={user?.city || t('profile.notSpecified')} className="input input-padding w-full" />
      </div>

      <div className={cls.fieldGroup}>
        <label className={cls.fieldLabel}>{t('profile.favouriteGenres')}</label>
        <input
          readOnly
          value={user?.genres ? getGenres(user.genres as GenreIds) : t('profile.notSpecified')}
          className="input input-padding w-full"
        />
      </div>
    </div>
  </div>
))
ProfileInfo.displayName = 'ProfileInfo'
