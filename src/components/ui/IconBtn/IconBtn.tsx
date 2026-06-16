import { ReactComponent as LikeIcon } from '../../../assets/images/general/like.svg'
import { ReactComponent as DislikeIcon } from '../../../assets/images/general/dislike.svg'
import { ReactComponent as HeartIcon } from '../../../assets/images/general/heart.svg'

type Icons = 'like' | 'dislike' | 'heart'

interface IconBtnProps {
  type: Icons
  onClick?: () => void
  isActive?: boolean
}

const icons = {
  like: LikeIcon,
  dislike: DislikeIcon,
  heart: HeartIcon,
}

const additionalStyle = {
  like: 'pt-1',
  dislike: 'pb-1',
  heart: '',
}

export const IconBtn = ({ type, onClick, isActive }: IconBtnProps) => {
  const Icon = icons[type]
  return (
    <button
      className={`w-[30.46px] h-[30.46px] flex justify-center items-center rounded-md transition-colors
        lg:w-[39.23px] lg:h-[39.23px]
        2xl:w-[58.87px] 2xl:h-[58.87px]
        ${additionalStyle[type]}
        ${isActive ? 'bg-gold' : 'bg-noir-card'}`}
      onClick={onClick}
    >
      <Icon className={'w-[44.1651%] h-auto'} />
    </button>
  )
}
