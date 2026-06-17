import type { ReactNode } from 'react'
import type { TFunction } from 'i18next'
import type { SocialMedias } from '../../../../api/types/socialMedias'
import type { IUser, SexType } from '../../../../api/types/responses'
import { ReactComponent as LinkedInIcon } from '../../../../assets/images/general/linkedin-in.svg'
import { ReactComponent as YoutubeIcon } from '../../../../assets/images/general/youtube.svg'
import { ReactComponent as InstagramIcon } from '../../../../assets/images/general/instagram.svg'
import { ReactComponent as TwitterIcon } from '../../../../assets/images/general/icons8-twitter.svg'
import { ReactComponent as FacebookIcon } from '../../../../assets/images/general/facebook-f.svg'

export type Fields = Pick<IUser, 'name' | 'surname' | 'about' | 'sex' | 'country' | 'city'>
export type SocialMediasType = { [K in SocialMedias]: string | null }

export const getSexOptions = (t: TFunction): { value: SexType; label: string }[] => [
  { value: 'male', label: t('settings.gender.male') },
  { value: 'female', label: t('settings.gender.female') },
  { value: 'others', label: t('settings.gender.others') },
  { value: 'notchosen', label: t('settings.gender.notchosen') },
]

export const getSocialBtns = (
  t: TFunction
): { id: number; icon: ReactNode; bg: string; name: SocialMedias; placeholder: string }[] => [
  { id: 1, icon: <LinkedInIcon />, bg: '#4D7198', name: 'linkedin', placeholder: t('settings.social.linkedin') },
  { id: 2, icon: <YoutubeIcon />, bg: '#F00', name: 'youtube', placeholder: t('settings.social.youtube') },
  {
    id: 3,
    icon: <InstagramIcon />,
    bg: 'linear-gradient(218deg, #532CD7 0%, #E32A47 60.04%, #EF7230 100%)',
    name: 'instagram',
    placeholder: t('settings.social.instagram'),
  },
  { id: 4, icon: <TwitterIcon />, bg: '#1DA1F2', name: 'twitter', placeholder: t('settings.social.twitter') },
  { id: 5, icon: <FacebookIcon />, bg: '#3B5998', name: 'facebook', placeholder: t('settings.social.facebook') },
]
