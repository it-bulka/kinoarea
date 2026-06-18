import { HeroSliderActions } from '../actions/heroSlider'
import { HeroSliderActionTypes } from '../actionsTypes/heroSlider'
import { IHeroSlide } from '../../api/types/heroSlider'

interface IHeroSliderState {
  slides: IHeroSlide[]
  isLoading: boolean
  error: string | null
}

const initial: IHeroSliderState = {
  slides: [],
  isLoading: true,
  error: null,
}

export const heroSliderReducer = (state = initial, action: HeroSliderActions): IHeroSliderState => {
  switch (action.type) {
    case HeroSliderActionTypes.LOAD:
      return { ...state, isLoading: true, error: null }
    case HeroSliderActionTypes.ADD_SLIDES:
      return { ...state, slides: action.payload, isLoading: false, error: null }
    case HeroSliderActionTypes.ERROR:
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}
