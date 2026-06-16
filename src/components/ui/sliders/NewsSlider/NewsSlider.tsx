import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper'
import { ReactComponent as ArrowLeftIcon } from '../../../../assets/images/general/arrow-nav-left.svg'
import { ReactComponent as ArrowRightIcon } from '../../../../assets/images/general/arrow-nav-right.svg'

interface NewsSliderProps {
  slides?: string[]
}

const classes = {
  btn: 'w-[62px] h-[62px] flex-center bg-noir-card text-white rounded-10 lg:w-[80px] lg:h-[80px]',
}
export const NewsSlider = ({ slides }: NewsSliderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  return (
    <div className={'mt-13 lg:mt-10 2xl:14'}>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={{
          nextEl: `.slider-news-next`,
          prevEl: `.slider-news-prev`,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          slideThumbActiveClass: 'slider-active',
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="slider-news max-h-[79vh] mt-13 "
      >
        {slides?.map((item, order) => (
          <SwiperSlide key={order}>
            <img src={item} alt={'img'} className={'aspect-[380/300] w-full object-cover rounded-10'} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={'mt-2 xl:relative xl:max-h-[19vh]'}>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={8}
          slidesPerView={2}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          breakpoints={{
            768: {
              spaceBetween: 18,
              slidesPerView: 4,
            },
            1000: {
              spaceBetween: 24,
              slidesPerView: 4,
            },
            1920: {
              spaceBetween: 28,
              slidesPerView: 4,
            },
          }}
        >
          {slides?.map((item, order) => (
            <SwiperSlide key={order} className={'max-h-full'}>
              <div className={'w-full relative rounded-10 overflow-hidden'}>
                <img
                  src={item}
                  alt={'img'}
                  className={`
                    w-full object-cover aspect-[180/128] max-h-[19vh]
                    md:aspect-[149/106] 
                    lg:aspect-[192/137] lg:aspect-[222/158]`}
                />
                <div className={'slider-active-cover absolute'} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={'w-fit flex gap-3 mt-[22px] mx-auto md:mt-[14px] lg:mt-[18px] lg:gap-6'}>
          <div
            className={`
              slider-news-prev ${classes.btn} 
              xl:absolute xl:top-1/2 xl:-left-6 xl:-translate-x-full xl:-translate-y-1/2`}
          >
            <ArrowLeftIcon />
          </div>
          <div
            className={`
              slider-news-next  ${classes.btn} 
              xl:absolute top-1/2 xl:-right-6 xl:translate-x-full xl:-translate-y-1/2`}
          >
            <ArrowRightIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
