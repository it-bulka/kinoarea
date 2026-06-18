import { useEffect, useCallback, useState, useRef, memo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper'
import type { Swiper as SwiperType } from 'swiper'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { HeroSlide } from './HeroSlide'
import { HeroSliderThumbnails } from './HeroSliderThumbnails'
import { HeroSliderSkeleton } from './HeroSliderSkeleton'
import { ReactComponent as ArrowLeft } from '../../../../assets/images/general/arrow-nav-left.svg'
import { ReactComponent as ArrowRight } from '../../../../assets/images/general/arrow-nav-right.svg'
import cls from './HeroSlider.module.scss'

export const HeroSlider = memo(() => {
  const { fetchHeroSlides } = useActions()
  const { slides, isLoading, error } = useTypedSelector(state => state.heroSlider)
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    if (!slides.length) fetchHeroSlides()
  }, [])

  const onSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex)
  }, [])

  const onThumbnailClick = useCallback((index: number) => {
    swiperRef.current?.slideToLoop(index)
  }, [])

  if (isLoading) return <HeroSliderSkeleton />
  if (error || !slides.length) return null

  return (
    <section className={cls.heroSlider} aria-label="Trending movies">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ el: '.hero-pagination', clickable: true }}
        navigation={{ prevEl: '.hero-prev', nextEl: '.hero-next' }}
        loop
        speed={800}
        onSwiper={swiper => {
          swiperRef.current = swiper
        }}
        onSlideChange={onSlideChange}
        className="h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <HeroSlide slide={slide} index={i} isActive={activeIndex === i} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className={`hero-prev ${cls.arrowBtn} ${cls.arrowLeft}`} aria-label="Previous slide">
        <ArrowLeft />
      </button>
      <button className={`hero-next ${cls.arrowBtn} ${cls.arrowRight}`} aria-label="Next slide">
        <ArrowRight />
      </button>

      <nav className={`hero-pagination ${cls.pagination}`} aria-label="Slide pagination" />

      <HeroSliderThumbnails slides={slides} activeIndex={activeIndex} onThumbnailClick={onThumbnailClick} />
    </section>
  )
})

HeroSlider.displayName = 'HeroSlider'
