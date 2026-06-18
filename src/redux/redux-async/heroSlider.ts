import { type Dispatch } from 'redux'
import { HeroSliderActionCreators } from '../actionsCreators/heroSlider'
import { type HeroSliderActions } from '../actions/heroSlider'
import { getTrendingMovies } from '../../api/movieDBApi'
import { type IHeroSlide } from '../../api/types/heroSlider'
import { type IMovieRes } from '../../api/types/film'
import { movieTypes, type GenreId } from '../../mock/types'

const SLIDES_COUNT = 8

const toHeroSlide = (m: IMovieRes): IHeroSlide => ({
  id: m.id,
  title: m.title || m.name || '',
  backdrop_path: m.backdrop_path,
  poster_path: m.poster_path,
  overview: m.overview,
  vote_average: m.vote_average,
  release_date: String(m.release_date || m.first_air_date || ''),
  runtime: 0,
  genres: m.genre_ids.map(id => movieTypes[id as GenreId]).filter(Boolean),
})

export const fetchHeroSlides = () => {
  return async (dispatch: Dispatch<HeroSliderActions>) => {
    try {
      dispatch(HeroSliderActionCreators.loadHeroSlider())

      const { results } = await getTrendingMovies('day')
      const slides = results
        .filter(m => m.backdrop_path)
        .slice(0, SLIDES_COUNT)
        .map(toHeroSlide)

      dispatch(HeroSliderActionCreators.addHeroSlides(slides))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Smth went wrong'
      dispatch(HeroSliderActionCreators.errorHeroSlider(message))
    }
  }
}
