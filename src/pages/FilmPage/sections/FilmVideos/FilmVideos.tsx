import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionHeader, SectionHeaderType } from '../../../../components/ui/SectionHeader/SectionHeader'
import { VideoCard } from '../../../../components/ui/VideoCard/VideoCard'
import { FilmVideosSkeleton } from '../FilmVideosSkeleton'
import { Paths } from '../../../../router/paths'
import type { IMovieVideo } from '../../../../api/types/responses'

const MAX_PREVIEW = 8

interface FilmVideosProps {
  slug: string
  videos: IMovieVideo[]
  isLoading: boolean
  onVideoSelect: (key: string) => void
}

export const FilmVideos = memo(({ slug, videos, isLoading, onVideoSelect }: FilmVideosProps) => {
  const { t } = useTranslation()

  const previewVideos = useMemo(() => videos.slice(0, MAX_PREVIEW), [videos])

  return (
    <section>
      <SectionHeader
        title={t('film.videos')}
        type={SectionHeaderType.ARROW}
        linkTitle={t('film.allVideos')}
        moveToViaArrow={Paths.film.videos(slug)}
        className={'mb-4 mt-7 md:mb-8 2xl:mb-20'}
      />
      {isLoading ? (
        <FilmVideosSkeleton />
      ) : videos.length === 0 ? (
        <p className={'py-6 text-center text-text-muted font-inter text-sm'}>{t('film.noVideos')}</p>
      ) : (
        <ul className={'grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'}>
          {previewVideos.map(video => (
            <li key={video.id}>
              <VideoCard
                videoKey={video.key}
                name={video.name}
                type={video.type}
                onClick={() => onVideoSelect(video.key)}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
})

FilmVideos.displayName = 'FilmVideos'
