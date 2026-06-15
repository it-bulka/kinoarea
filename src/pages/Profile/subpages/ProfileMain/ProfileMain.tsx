import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import { Descript } from '../../../../components/ui/Descript/Descript'
import { ProfilePages } from '../../../../router/paths'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useProfileStats } from '../../../../hooks/useProfileStats'
import { InfoItem } from './InfoItem'
import { getDate, getGenres } from '../../../../utils'
import { GenreIds } from '../../../../mock/types'
import { twMerge } from 'tailwind-merge'
import type { SocialMedias } from '../../../../api/types/socialMedias'
import cls from '../../Profile.module.scss'
import { useTranslation } from 'react-i18next'

import { ReactComponent as SettingsIcon } from '../../../../assets/images/general/settings.svg'
import { ReactComponent as YoutubeIcon } from '../../../../assets/images/general/youtube.svg'
import { ReactComponent as LinkedInIcon } from '../../../../assets/images/general/linkedin-in.svg'
import { ReactComponent as TwitterIcon } from '../../../../assets/images/general/icons8-twitter.svg'
import { ReactComponent as InstagramIcon } from '../../../../assets/images/general/instagram.svg'
import { ReactComponent as FacebookIcon } from '../../../../assets/images/general/facebook-f.svg'
import Avatar from '../../../../assets/images/general/avatar.svg'

const socialsMedia: Record<SocialMedias, JSX.Element> = {
  youtube: <YoutubeIcon />,
  linkedin: <LinkedInIcon />,
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  twitter: <TwitterIcon />,
}

const socials: { id: number; name: SocialMedias }[] = [
  { id: 1, name: 'youtube' },
  { id: 2, name: 'linkedin' },
  { id: 3, name: 'facebook' },
  { id: 4, name: 'instagram' },
  { id: 5, name: 'twitter' },
]

export const ProfileMain = () => {
  const { user } = useTypedSelector(state => state.user)
  const stats = useProfileStats(user?.id)
  const { t } = useTranslation()

  const statsItems = useMemo(
    () => [
      { id: 1, title: t('profile.stats.friends'), amount: user?.friends?.length ?? 0, to: ProfilePages.friends },
      { id: 2, title: t('profile.stats.likedFilms'), amount: stats.liked, to: ProfilePages.likes },
      { id: 3, title: t('profile.stats.favourites'), amount: stats.favourite, to: ProfilePages.films },
      { id: 4, title: t('profile.stats.reviews'), amount: stats.reviews, to: ProfilePages.reviews },
      { id: 5, title: t('profile.stats.upcoming'), amount: 0 },
    ],
    [user?.friends?.length, stats, t]
  )

  return (
    <>
      <div className={cls.titleWrapper}>
        <Typography variant={'h2'} type={TypographyTypes._TITLE}>
          {t('profile.title')}
        </Typography>
        <Link className={cls.titleBtn} to={ProfilePages.setting}>
          <SettingsIcon className={'w-[14.8px] md:w-[18.2px]'} />
          <span>{t('profile.settings')}</span>
        </Link>
      </div>

      <div className={'md:flex md:items-start md:gap-6 md:my-[22px] 2xl:gap-11'}>
        {user?.img ? (
          <img src={user.img} alt={user.name} className={cls.img} />
        ) : (
          <img src={Avatar} alt={'avatar'} className={twMerge(cls.img, 'avatar')} />
        )}
        <div>
          <Typography variant={'h2'} type={TypographyTypes._TITLE} className={'text-center md:text-start'}>
            {user?.name} {user?.surname}
          </Typography>
          <div className={'flex-center gap-2.5 mt-2 md:justify-start'}>
            {socials.map(item => (
              <Link
                key={item.id}
                to={user?.links?.[item.name] || ''}
                className={
                  'rounded-full border-[1px] border-border-blue w-[26.27px] h-[26.27px] flex-center text-gray [&>svg]:w-[50%] [&>svg]:max-h-[50%]'
                }
              >
                {socialsMedia[item.name]}
              </Link>
            ))}
          </div>
          <p
            className={`text-13 text-white/80 text-center mt-3.5 mb-4
              md:text-15 md:text-start md:mt-3 md:mb-[22px]
              lg:mb-7 2xl:text-17 2xl:mt-4.5`}
          >
            {user?.about || t('profile.notSpecified')}
          </p>
          <div>
            <Descript title={t('profile.sex')} descriptions={user?.sex || t('profile.notSpecified')} />
            <Descript
              title={t('profile.birthday')}
              descriptions={user?.birthday ? getDate(user.birthday.toDate()) : t('profile.notSpecified')}
            />
            <Descript title={t('profile.country')} descriptions={user?.country || t('profile.notSpecified')} />
            <Descript title={t('profile.city')} descriptions={user?.city || t('profile.notSpecified')} />
            <Descript
              title={t('profile.favouriteGenres')}
              descriptions={user?.genres ? getGenres(user.genres as GenreIds) : t('profile.notSpecified')}
            />
          </div>
        </div>
      </div>

      <div
        className={'flex-center flex-wrap font-q-700 text-xs text-center whitespace-wrap md:text-15 md:justify-between'}
      >
        {statsItems.map(item => (
          <InfoItem key={item.id} title={item.title} amount={item.amount} to={item.to} />
        ))}
      </div>
    </>
  )
}
