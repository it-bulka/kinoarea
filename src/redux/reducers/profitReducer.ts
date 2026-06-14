import { Profit } from '../actionsTypes/profit'
import { ICategory } from '../../components/ui/Category/Category'
import { profit } from '../../mock/categories'
import { ProfitActions } from '../actions/profit'
import { IIncome } from '../../api/types'

interface IProfitState {
  activeCategory: ICategory
  items: IIncome[]
  isLoading: boolean
  error: string | null
}

const initialState: IProfitState = {
  activeCategory: profit[0],
  items: [],
  isLoading: false,
  error: null,
}

export const profitReducer = (state: IProfitState = initialState, action: ProfitActions): IProfitState => {
  switch (action.type) {
    case Profit.CHANGE_CATEGORY:
      return { ...state, activeCategory: action.payload }
    case Profit.LOAD_ITEMS:
      return { ...state, isLoading: true, error: null }
    case Profit.ADD_ITEMS:
      return { ...state, items: action.payload, isLoading: false }
    case Profit.ERROR_ITEMS:
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}
