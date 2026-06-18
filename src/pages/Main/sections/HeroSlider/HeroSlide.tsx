import { memo, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../components/ui/Button/Button'
import { BaseMovieDBOriginalUrl } from '../../../../api/endpoints'
import { type IHeroSlide } from '../../../../api/types/heroSlider'
import cls from './HeroSlider.module.scss'

interface HeroSlideProps {
  slide: IHeroSlide
  index: number
  isActive: boolean
}

const formatRuntime = (minutes: number): string => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export const HeroSlide = memo(({ slide, index, isActive }: HeroSlideProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const year = useMemo(() => slide.release_date?.slice(0, 4) ?? '', [slide.release_date])
  const runtime = useMemo(() => formatRuntime(slide.runtime), [slide.runtime])
  const genresText = useMemo(() => slide.genres.slice(0, 3).join(', '), [slide.genres])
  const rating = useMemo(() => slide.vote_average.toFixed(1), [slide.vote_average])

  const goToFilm = () => navigate(`/films/${slide.id}`)

  const contentClass = `relative z-10 mx-auto max-w-[1400px] px-5 md:px-10 2xl:px-20 flex flex-col justify-center h-full ${
    cls.slideContent
  } ${isActive ? cls.active : ''}`

  return (
    <div className="relative w-full h-full">
      <img
        src={`${BaseMovieDBOriginalUrl}${slide.backdrop_path}`}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading={index === 0 ? 'eager' : 'lazy'}
        draggable={false}
      />

      <div className={cls.gradient} />

      <div className={contentClass}>
        <div className="max-w-[45%] min-w-[280px]">
          <span className={cls.trendingBadge}>
            🔥 {t('main.heroSlider.trending')} #{index + 1}
          </span>

          <h2 className="font-playfair font-bold text-2xl md:text-40 2xl:text-50 text-white mt-4 mb-3 leading-tight">
            {slide.title}
          </h2>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm md:text-base text-text-muted font-inter mb-4">
            <span className="flex items-center gap-1 text-gold font-semibold">⭐ {rating}</span>
            <span className={cls.metaSeparator} />
            <span>{year}</span>
            <span className={cls.metaSeparator} />
            <span>{runtime}</span>
            {genresText && (
              <>
                <span className={cls.metaSeparator} />
                <span>{genresText}</span>
              </>
            )}
          </div>

          <p className="hidden md:block font-inter text-sm 2xl:text-base text-text-muted leading-relaxed line-clamp-3 max-w-[500px] mb-6">
            {slide.overview}
          </p>

          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="primary" className="h-[52px] min-w-[150px] flex-center gap-2" onClick={goToFilm}>
              ▶ {t('main.heroSlider.watchNow')}
            </Button>
            <Button variant="ghost" className="h-[52px] min-w-[150px] flex-center" onClick={goToFilm}>
              {t('main.heroSlider.moreDetails')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})

HeroSlide.displayName = 'HeroSlide'
