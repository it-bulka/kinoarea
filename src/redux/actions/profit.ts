import { Profit } from '../actionsTypes/profit'
import { ICategory } from '../../components/ui/Category/Category'
import { IIncome } from '../../api/types'

interface ChangeCategory {
  type: Profit.CHANGE_CATEGORY
  payload: ICategory
}

interface LoadProfitItems {
  type: Profit.LOAD_ITEMS
}

interface AddProfitItems {
  type: Profit.ADD_ITEMS
  payload: IIncome[]
}

interface ErrorProfitItems {
  type: Profit.ERROR_ITEMS
  payload: string | null
}

export type ProfitActions = ChangeCategory | LoadProfitItems | AddProfitItems | ErrorProfitItems
