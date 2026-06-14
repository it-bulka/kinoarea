import type { ReactNode } from 'react'
import type { SocialMedias } from '../../../../api/types/socialMedias'
import type { IUser, SexType } from '../../../../api/types/responses'
import { ReactComponent as LinkedInIcon } from '../../../../assets/images/general/linkedin-in.svg'
import { ReactComponent as YoutubeIcon } from '../../../../assets/images/general/youtube.svg'
import { ReactComponent as InstagramIcon } from '../../../../assets/images/general/instagram.svg'
import { ReactComponent as TwitterIcon } from '../../../../assets/images/general/icons8-twitter.svg'
import { ReactComponent as FacebookIcon } from '../../../../assets/images/general/facebook-f.svg'

export type Fields = Pick<IUser, 'name' | 'surname' | 'about' | 'sex'>
export type SocialMediasType = { [K in SocialMedias]: string | null }

export const sexOptions: { value: SexType; label: string }[] = [
  { value: 'male', label: 'мужчина' },
  { value: 'female', label: 'женщина' },
  { value: 'others', label: 'другое' },
  { value: 'notchosen', label: 'не указывать' },
]

export const socialBtns: { id: number; icon: ReactNode; bg: string; name: SocialMedias; placeholder: string }[] = [
  { id: 1, icon: <LinkedInIcon />, bg: '#4D7198', name: 'linkedin', placeholder: 'ссылка на линкедин' },
  { id: 2, icon: <YoutubeIcon />, bg: '#F00', name: 'youtube', placeholder: 'ссылка на youtube' },
  {
    id: 3,
    icon: <InstagramIcon />,
    bg: 'linear-gradient(218deg, #532CD7 0%, #E32A47 60.04%, #EF7230 100%)',
    name: 'instagram',
    placeholder: 'ссылка на instagram',
  },
  { id: 4, icon: <TwitterIcon />, bg: '#1DA1F2', name: 'twitter', placeholder: 'ссылка на twitter' },
  { id: 5, icon: <FacebookIcon />, bg: '#3B5998', name: 'facebook', placeholder: 'ссылка на facebook' },
]
