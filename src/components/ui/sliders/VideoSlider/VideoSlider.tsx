import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { VideoSlide } from './VideoSlide'
import { IVideo } from '../../../../api/types'

interface VideoSliderProps {
  slides: IVideo[]
}

export const VideoSlider = ({ slides }: VideoSliderProps) => (
  <Swiper
    spaceBetween={8}
    slidesPerView={2}
    modules={[Pagination]}
    pagination={{ type: 'progressbar' }}
    navigation={true}
    breakpoints={{ 768: { slidesPerView: 4, spaceBetween: 6 } }}
    className={'slider-progress'}
  >
    {slides.map(item => (
      <SwiperSlide key={item.id}>
        <VideoSlide src={item.src} title={item.title} />
      </SwiperSlide>
    ))}
  </Swiper>
)
