import { HeroSliderActionTypes } from '../actionsTypes/heroSlider'
import { IHeroSlide } from '../../api/types/heroSlider'
import { CustomError } from '../../api/types/responses'

export interface LoadHeroSlider {
  type: HeroSliderActionTypes.LOAD
}

export interface AddHeroSlides {
  type: HeroSliderActionTypes.ADD_SLIDES
  payload: IHeroSlide[]
}

export interface ErrorHeroSlider {
  type: HeroSliderActionTypes.ERROR
  payload: CustomError
}

export type HeroSliderActions = LoadHeroSlider | AddHeroSlides | ErrorHeroSlider
