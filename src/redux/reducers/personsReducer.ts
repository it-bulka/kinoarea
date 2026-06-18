import { PersonsActions } from '../actions/persons'
import { Persons } from '../actionsTypes/persons'
import { CustomError, IPerson } from '../../api/types'
import { ICategory } from '../../components/ui/Category/Category'
import { persons } from '../../mock/categories'

interface IPersonsState {
  popular: IPerson[]
  error: CustomError
  loading: boolean
  activeCategory: ICategory
}
const initialState: IPersonsState = {
  popular: [],
  error: null,
  loading: true,
  activeCategory: persons[0],
}
export const personsReducer = (state: IPersonsState = initialState, action: PersonsActions): IPersonsState => {
  switch (action.type) {
    case Persons.ADD_POPULAR:
      return { ...state, popular: action.payload, loading: false, error: null }
    case Persons.LOAD_POPULAR:
      return { ...state, loading: true, error: null }
    case Persons.ERROR_POPULAR:
      return { ...state, loading: false, error: action.payload }
    case Persons.CHANGE_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload }
    default:
      return state
  }
}
