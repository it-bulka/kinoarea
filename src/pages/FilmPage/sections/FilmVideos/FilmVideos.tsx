import { ReactComponent as PlayIcon } from '../../../../assets/images/general/play-btn.svg'
import { IMovieVideo } from '../../../../api/types/responses'
import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import cls from './FilmVideos.module.scss'

const getYoutubeThumbnail = (key: string) => `https://img.youtube.com/vi/${key}/mqdefault.jpg`

interface FilmVideosProps {
  videos: IMovieVideo[]
  onVideoSelect: (key: string) => void
}

export const FilmVideos = ({ videos, onVideoSelect }: FilmVideosProps) => {
  if (!videos.length) return null

  return (
    <>
      <Typography variant="h3" type={TypographyTypes._TITLE} className="mx-auto mb-[18px] md:mb-9 2xl:mb-[42px] w-max">
        Трейлери та відео
      </Typography>
      <div className={cls.videosGrid}>
        {videos.map(video => (
          <button key={video.id} className={cls.card} onClick={() => onVideoSelect(video.key)}>
            <div className={cls.thumbWrap}>
              <img src={getYoutubeThumbnail(video.key)} alt={video.name} className={cls.thumb} />
              <div className={cls.overlay}>
                <PlayIcon className={cls.playIcon} />
              </div>
            </div>
            <p className="text-xs font-black mt-2 line-clamp-2 lg:text-sm">{video.name}</p>
            <span className="text-xs text-white/50 capitalize">{video.type}</span>
          </button>
        ))}
      </div>
    </>
  )
}
