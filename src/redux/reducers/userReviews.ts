import { IUserReview } from '../../api/types/responses'
import { UserReviewActions } from '../actions/userReviews'
import { UserReviews } from '../actionsTypes/userReviews'

interface IInitialState {
  reviews: IUserReview[]
  loading: boolean
  error: string | null
}

const initialState: IInitialState = {
  reviews: [],
  loading: false,
  error: null,
}
export const userReviewsReduser = (state = initialState, action: UserReviewActions) => {
  switch (action.type) {
    case UserReviews.ADD_REVIEWS:
      return { ...state, reviews: action.payload, loading: false, error: null }
    case UserReviews.LOAD_REVIEWS:
      return { ...state, loading: true }
    case UserReviews.ERR_REVIEWS:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
