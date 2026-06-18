import { IFriend } from '../../api/types/responses'
import { UserFriendsActions } from '../actions/userFriends'
import { UserFriends } from '../actionsTypes/userFriends'

interface IInitialState {
  friends: IFriend[]
  loading: boolean
  error: string | null
}

const initialState: IInitialState = {
  friends: [],
  loading: false,
  error: null,
}
export const userFriendsReducer = (state = initialState, action: UserFriendsActions): IInitialState => {
  switch (action.type) {
    case UserFriends.ADD_FRIENDS:
      return { ...state, friends: action.payload, loading: false, error: null }
    case UserFriends.LOAD_FRIENDS:
      return { ...state, loading: true }
    case UserFriends.ERR_FRIENDS:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
