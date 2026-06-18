import { HeroSliderActionTypes } from '../actionsTypes/heroSlider'
import * as Actions from '../actions/heroSlider'
import { IHeroSlide } from '../../api/types/heroSlider'

export const HeroSliderActionCreators = {
  loadHeroSlider: (): Actions.LoadHeroSlider => ({
    type: HeroSliderActionTypes.LOAD,
  }),
  addHeroSlides: (slides: IHeroSlide[]): Actions.AddHeroSlides => ({
    type: HeroSliderActionTypes.ADD_SLIDES,
    payload: slides,
  }),
  errorHeroSlider: (err: string | null): Actions.ErrorHeroSlider => ({
    type: HeroSliderActionTypes.ERROR,
    payload: err,
  }),
}
