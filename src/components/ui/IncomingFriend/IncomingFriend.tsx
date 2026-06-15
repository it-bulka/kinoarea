import { ReactComponent as CloseBtn } from '../../../assets/images/general/close-btn.svg'
import cls from './IncomingFriend.module.scss'
import { useTranslation } from 'react-i18next'

interface IncomingFriendProps {
  img: string
  name: string
  commonFriends: number
  onAccept?: () => void
  onCancel?: () => void
  onBlock?: () => void
  onClose?: () => void
}

type Btns = 'accept' | 'cancel' | 'block'

export const IncomingFriend = ({
  img,
  name,
  commonFriends,
  onAccept,
  onCancel,
  onBlock,
  onClose,
}: IncomingFriendProps) => {
  const { t } = useTranslation()

  const btns: { id: number; title: string; name: Btns }[] = [
    { id: 1, title: t('friends.accept'), name: 'accept' },
    { id: 2, title: t('friends.decline'), name: 'cancel' },
    { id: 3, title: t('friends.block'), name: 'block' },
  ]

  const handlers: Record<Btns | 'close', (() => void) | undefined> = {
    accept: onAccept,
    cancel: onCancel,
    block: onBlock,
    close: onClose,
  }
  return (
    <div className={cls.wrapper}>
      <img src={img} alt={name} className={cls.avatar} />
      <div className={cls.textWrapper}>
        <p className={cls.title}>{t('friends.request', { name, count: commonFriends })}</p>
        <div className={cls.btns}>
          {btns.map(item => (
            <button onClick={() => handlers[item.name]?.()} key={item.id} className={cls.btn}>
              {item.title}
            </button>
          ))}
          <button onClick={() => handlers.close?.()}>
            <CloseBtn className={cls.svg} />
          </button>
        </div>
      </div>
    </div>
  )
}
