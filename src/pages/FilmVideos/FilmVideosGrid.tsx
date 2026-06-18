import { useRef, useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import type { IMovieVideo } from '../../api/types/responses'
import { VideoCard } from '../../components/ui/VideoCard/VideoCard'
import { MovieModal } from '../../components/ui/modals/MovieModal/MovieModal'
import { Button } from '../../components/ui/Button/Button'
import { Skeleton } from '../../components/ui/Skeleton/Skeleton'

const INITIAL_COUNT = 50
const LOAD_MORE_COUNT = 50
const SKELETON_ITEMS = 4

interface FilmVideosGridProps {
  videos: IMovieVideo[]
}

export const FilmVideosGrid = ({ videos }: FilmVideosGridProps) => {
  const { t } = useTranslation()
  const gridRef = useRef<HTMLUListElement>(null)
  const prevCountRef = useRef(0)
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)

  const visibleVideos = useMemo(() => videos.slice(0, visibleCount), [videos, visibleCount])
  const hasMore = visibleCount < videos.length

  const handleVideoSelect = useCallback((key: string) => {
    setSelectedKey(key)
    setModalOpen(true)
  }, [])

  const closeModal = useCallback(() => setModalOpen(false), [])

  const loadMore = useCallback(() => {
    setIsLoadingMore(true)
    setTimeout(() => {
      prevCountRef.current = visibleCount
      setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, videos.length))
      setIsLoadingMore(false)
    }, 300)
  }, [videos.length, visibleCount])

  useGSAP(
    () => {
      if (!gridRef.current || !visibleVideos.length) return
      const allItems = gridRef.current.querySelectorAll('.video-item')
      const newItems = Array.from(allItems).slice(prevCountRef.current)
      if (!newItems.length) return
      gsap.fromTo(
        newItems,
        { opacity: 0, y: 40, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
      )
    },
    { scope: gridRef, dependencies: [visibleVideos] }
  )

  return (
    <>
      <ul ref={gridRef} className={'grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'}>
        {visibleVideos.map(video => (
          <li key={video.id} className="video-item">
            <VideoCard
              videoKey={video.key}
              name={video.name}
              type={video.type}
              onClick={() => handleVideoSelect(video.key)}
            />
          </li>
        ))}
      </ul>

      {isLoadingMore && (
        <div className={'grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 mt-3'}>
          {Array.from({ length: SKELETON_ITEMS }).map((_, i) => (
            <div key={i}>
              <Skeleton className={'w-full aspect-video rounded-10'} />
              <Skeleton className={'h-3 w-3/4 mt-2 rounded-5'} />
              <Skeleton className={'h-2.5 w-1/3 mt-1 rounded-5'} />
            </div>
          ))}
        </div>
      )}

      {hasMore && !isLoadingMore && (
        <div className={'flex justify-center mt-8'}>
          <Button variant="ghost" onClick={loadMore}>
            {t('film.loadMoreVideos')}
          </Button>
        </div>
      )}

      <MovieModal close={closeModal} isOpened={isModalOpen} videoKey={selectedKey} />
    </>
  )
}
