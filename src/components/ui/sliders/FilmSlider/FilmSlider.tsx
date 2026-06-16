import { IMovies } from '../../../../api/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Film } from '../../Film/Film'
import { Navigation, Pagination } from 'swiper'
import { BaseMovieDBAssetsUrl } from '../../../../api'
import { getGenres } from '../../../../utils/getGenres'
import type { GenreIds } from '../../../../mock/types'

interface FilmSliderProps {
  slides: IMovies
  name: string
}

export const FilmSlider = ({ slides, name }: FilmSliderProps) => {
  return (
    <Swiper
      spaceBetween={8}
      slidesPerView={2}
      slidesPerGroup={1}
      modules={[Pagination, Navigation]}
      pagination={{
        el: `.${name}-pagination`,
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          return `${current}/${total}`
        },
      }}
      navigation={{
        nextEl: `.${name}-next`,
        prevEl: `.${name}-prev`,
      }}
      breakpoints={{
        768: {
          slidesPerView: 3,
          spaceBetween: 6,
        },
        914: {
          slidesPerView: 4,
          spaceBetween: 12,
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 16,
        },
      }}
      className={'slider-cards'}
    >
      {slides.map(item => {
        const genres = getGenres(item.genre_ids as unknown as GenreIds)
        return (
          <SwiperSlide key={item.id}>
            <Film
              img={`${BaseMovieDBAssetsUrl}${item.poster_path}`}
              rating={item.vote_average}
              title={item.title || item.name || ''}
              genre={genres}
              id={item.id}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
