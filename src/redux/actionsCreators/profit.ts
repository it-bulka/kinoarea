import { ICategory } from '../../components/ui/Category/Category'
import { Profit } from '../actionsTypes/profit'
import { IIncome } from '../../api/types'
import type { ProfitActions } from '../actions/profit'

export const ProfitActionCreators = {
  changeProfitActiveCategory: (category: ICategory): ProfitActions => ({
    type: Profit.CHANGE_CATEGORY,
    payload: category,
  }),
  loadProfitItems: (): ProfitActions => ({ type: Profit.LOAD_ITEMS }),
  addProfitItems: (items: IIncome[]): ProfitActions => ({ type: Profit.ADD_ITEMS, payload: items }),
  errorProfitItems: (error: string | null): ProfitActions => ({ type: Profit.ERROR_ITEMS, payload: error }),
}
