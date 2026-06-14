import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import { Descript } from '../../../../components/ui/Descript/Descript'
import { Link } from 'react-router-dom'
import { ProfilePages } from '../../../../router/paths'

import { ReactComponent as SettingsIcon } from '../../../../assets/images/general/settings.svg'
import { ReactComponent as YoutubeIcon } from '../../../../assets/images/general/youtube.svg'
import { ReactComponent as LinkedInIcon } from '../../../../assets/images/general/linkedin-in.svg'
import { ReactComponent as TwitterIcon } from '../../../../assets/images/general/icons8-twitter.svg'
import { ReactComponent as InstagramIcon } from '../../../../assets/images/general/instagram.svg'
import { ReactComponent as FacebookIcon } from '../../../../assets/images/general/facebook-f.svg'
import cls from '../../Profile.module.scss'
import type { SocialMedias } from '../../../../api/types/socialMedias'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { getDate, getGenres } from '../../../../utils'
import { GenreIds } from '../../../../mock/types'
import { IUser } from '../../../../api/types/responses'
import Avatar from '../../../../assets/images/general/avatar.svg'
import { twMerge } from 'tailwind-merge'

const socialsMedia = {
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

interface InfoItemProps {
  amount: number
  title: string
  to?: string
}

const InfoItem = ({ amount, title, to }: InfoItemProps) => {
  const inner = (
    <>
      <p>{amount}</p>
      <p className={'w-min lg:w-auto'}>{title}</p>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={'text-[#323A55] px-1 hover:text-blue transition-colors'}>
        {inner}
      </Link>
    )
  }

  return <div className={'text-[#323A55] px-1'}>{inner}</div>
}

const info: { id: number; title: string; to?: string; property?: keyof Pick<IUser, 'friends' | 'reviews'> }[] = [
  { title: 'Друзья', id: 1, property: 'friends', to: ProfilePages.friends },
  { title: `Любимые\nфильмы`, id: 2, to: ProfilePages.likes },
  { title: 'Избранное', id: 3, to: ProfilePages.films },
  { title: 'Рецензии', id: 4, property: 'reviews', to: ProfilePages.reviews },
  { title: 'Ожидаемые\nфильмы', id: 5 },
]
export const ProfileMain = () => {
  const { user } = useTypedSelector(state => state.user)

  return (
    <>
      <div className={cls.titleWrapper}>
        <Typography variant={'h2'} type={TypographyTypes._TITLE}>
          Ваш профиль
        </Typography>
        <Link className={cls.titleBtn} to={ProfilePages.setting}>
          <SettingsIcon className={'w-[14.8px] md:w-[18.2px]'} />
          <span>Настройки</span>
        </Link>
      </div>
      <div className={'md:flex md:items-start md:gap-6 md:my-[22px] 2xl:gap-11'}>
        {user?.img ? (
          <img src={user?.img} alt={user.name} className={cls.img} />
        ) : (
          <img src={Avatar} alt={'avatar'} className={twMerge(cls.img, 'avatar')} />
        )}
        <div>
          <Typography variant={'h2'} type={TypographyTypes._TITLE} className={'text-center md:text-start'}>
            {user?.name} {user?.surname}
          </Typography>
          <div className={'flex-center gap-2.5 mt-2 md:justify-start'}>
            {socials.map(item => {
              return (
                <Link
                  to={user?.links?.[item?.name] || ''}
                  className={
                    'rounded-full border-[1px] border-border-blue w-[26.27px] h-[26.27px] flex-center text-gray [&>svg]:w-[50%] [&>svg]:max-h-[50%]'
                  }
                  key={item.id}
                >
                  {socialsMedia[item?.name]}
                </Link>
              )
            })}
          </div>
          <p
            className={`text-13 text-white/80 text-center mt-3.5 mb-4 
              md:text-15 md:text-start md:mt-3 md:mb-[22px] 
              lg:mb-7 2xl:text-17 2xl:mt-4.5`}
          >
            {user?.about || 'не указано'}
          </p>
          <div>
            <Descript title={'Пол'} descriptions={user?.sex || 'не указано'} />
            <Descript
              title={'День рождения'}
              descriptions={user?.birthday ? getDate(user.birthday.toDate()) : 'не указано'}
            />
            <Descript title={'Страна'} descriptions={user?.country || 'не указано'} />
            <Descript title={'Город'} descriptions={user?.city || 'не указано'} />
            <Descript
              title={'Любимые жанры:'}
              descriptions={user?.genres ? getGenres(user.genres as GenreIds) : 'не указано'}
            />
          </div>
        </div>
      </div>
      <div
        className={'flex-center flex-wrap font-q-700 text-xs text-center whitespace-wrap md:text-15 md:justify-between'}
      >
        {info.map(item => (
          <InfoItem
            key={item.id}
            title={item.title}
            amount={(item.property && user?.[item.property]?.length) || 0}
            to={item.to}
          />
        ))}
      </div>
    </>
  )
}
