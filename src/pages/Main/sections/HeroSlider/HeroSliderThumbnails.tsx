import { memo, useMemo } from 'react'
import { BaseMovieDBAssetsUrl } from '../../../../api/endpoints'
import { type IHeroSlide } from '../../../../api/types/heroSlider'
import cls from './HeroSlider.module.scss'

interface HeroSliderThumbnailsProps {
  slides: IHeroSlide[]
  activeIndex: number
  onThumbnailClick: (index: number) => void
}

const VISIBLE_COUNT = 4

export const HeroSliderThumbnails = memo(({ slides, activeIndex, onThumbnailClick }: HeroSliderThumbnailsProps) => {
  const thumbnails = useMemo(() => {
    const result: { slide: IHeroSlide; realIndex: number }[] = []
    for (let i = 1; i <= VISIBLE_COUNT; i++) {
      const idx = (activeIndex + i) % slides.length
      result.push({ slide: slides[idx], realIndex: idx })
    }
    return result
  }, [slides, activeIndex])

  return (
    <div className={cls.thumbnails}>
      {thumbnails.map(({ slide, realIndex }) => (
        <button
          key={slide.id}
          className={cls.thumbnail}
          onClick={() => onThumbnailClick(realIndex)}
          aria-label={slide.title}
        >
          <img
            src={`${BaseMovieDBAssetsUrl}${slide.poster_path}`}
            alt={slide.title}
            className="w-full h-full object-cover rounded"
            loading="lazy"
            draggable={false}
          />
        </button>
      ))}
    </div>
  )
})

HeroSliderThumbnails.displayName = 'HeroSliderThumbnails'
