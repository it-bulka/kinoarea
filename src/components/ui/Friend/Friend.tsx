import { IFriend } from '../../../api/types/responses'
import Avatar from '../../../assets/images/general/avatar.svg'
import cls from './Friend.module.scss'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

interface FriendProps extends IFriend {
  online: boolean
}
export const Friend = ({ img, name, surname, online }: FriendProps) => {
  const { t } = useTranslation()
  return (
    <div>
      <img src={img || Avatar} alt={name} className={cls.img} />
      <p className={cls.name}>
        {name} {surname}
      </p>
      {online ? (
        <p className={twMerge(cls.status, cls.online)}>{t('friends.online')}</p>
      ) : (
        <p className={cls.status}>{t('friends.online')}</p>
      )}
    </div>
  )
}
