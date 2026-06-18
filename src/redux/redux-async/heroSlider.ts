import { type Dispatch } from 'redux'
import { HeroSliderActionCreators } from '../actionsCreators/heroSlider'
import { type HeroSliderActions } from '../actions/heroSlider'
import { getTrendingMovies, getMovieDetails } from '../../api/movieDBApi'
import { type IHeroSlide } from '../../api/types/heroSlider'
import { type IMovieDetailsRes } from '../../api/types/responses'

const SLIDES_COUNT = 8

const toHeroSlide = (d: IMovieDetailsRes): IHeroSlide => ({
  id: d.id,
  title: d.title,
  backdrop_path: d.backdrop_path,
  poster_path: d.poster_path,
  overview: d.overview,
  vote_average: d.vote_average,
  release_date: String(d.release_date),
  runtime: d.runtime,
  genres: d.genres.map(g => g.name),
})

export const fetchHeroSlides = () => {
  return async (dispatch: Dispatch<HeroSliderActions>) => {
    try {
      dispatch(HeroSliderActionCreators.loadHeroSlider())

      const { results } = await getTrendingMovies('day')
      const candidates = results.filter(m => m.backdrop_path).slice(0, SLIDES_COUNT)
      const details = await Promise.all(candidates.map(m => getMovieDetails(String(m.id))))
      const slides = details.filter(d => d.backdrop_path).map(toHeroSlide)

      dispatch(HeroSliderActionCreators.addHeroSlides(slides))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Smth went wrong'
      dispatch(HeroSliderActionCreators.errorHeroSlider(message))
    }
  }
}
