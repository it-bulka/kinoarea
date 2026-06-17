import { memo } from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import type { IUser } from '../../../../api/types/responses'
import type { SocialMedias } from '../../../../api/types/socialMedias'
import Avatar from '../../../../assets/images/general/avatar.svg'
import { ReactComponent as YoutubeIcon } from '../../../../assets/images/general/youtube.svg'
import { ReactComponent as LinkedInIcon } from '../../../../assets/images/general/linkedin-in.svg'
import { ReactComponent as TwitterIcon } from '../../../../assets/images/general/icons8-twitter.svg'
import { ReactComponent as InstagramIcon } from '../../../../assets/images/general/instagram.svg'
import { ReactComponent as FacebookIcon } from '../../../../assets/images/general/facebook-f.svg'
import cls from './ProfileMain.module.scss'

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

interface ProfileAvatarProps {
  user: IUser | null
}

export const ProfileAvatar = memo(({ user }: ProfileAvatarProps) => (
  <div className={cls.avatarCol}>
    <img
      src={user?.img || Avatar}
      alt={user?.name || 'avatar'}
      className={twMerge(cls.avatarImg, !user?.img ? 'avatar' : '')}
    />
    <div className={cls.socialsRow}>
      {socials.map(item => (
        <Link
          key={item.id}
          to={user?.links?.[item.name] || '#'}
          className={cls.socialLink}
          target={user?.links?.[item.name] ? '_blank' : undefined}
          rel={user?.links?.[item.name] ? 'noopener noreferrer' : undefined}
        >
          {socialsMedia[item.name]}
        </Link>
      ))}
    </div>
  </div>
))
ProfileAvatar.displayName = 'ProfileAvatar'
