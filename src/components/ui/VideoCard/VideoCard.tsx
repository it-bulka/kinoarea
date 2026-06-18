import { memo } from 'react'
import { ReactComponent as PlayIcon } from '@/assets/images/general/play-btn.svg'
import { getYoutubeThumbnail } from '../../../utils'
import cls from './VideoCard.module.scss'

interface VideoCardProps {
  videoKey: string
  name: string
  type: string
  onClick: () => void
}

export const VideoCard = memo(({ videoKey, name, type, onClick }: VideoCardProps) => (
  <article className={cls.card}>
    <button className={'w-full text-left'} onClick={onClick} type="button" aria-label={name}>
      <div className={cls.thumbWrap}>
        <img src={getYoutubeThumbnail(videoKey)} alt={name} className={cls.thumb} loading="lazy" />
        <div className={cls.overlay}>
          <PlayIcon className={cls.playIcon} />
        </div>
      </div>
      <p className="text-xs font-black mt-2 line-clamp-2 lg:text-sm">{name}</p>
      <span className="text-xs text-white/50 capitalize">{type}</span>
    </button>
  </article>
))

VideoCard.displayName = 'VideoCard'
