import { UserActions } from '../actions/user-actions'
import { UserAction } from '../enums/user-action'
import { IUserListState } from '../interfaces/user-list-state'

export const initState: IUserListState = {
  users: []
}

export const userReducer = (state: IUserListState = initState, action: UserActions): IUserListState => {
  switch (action.type) {
    case UserAction.UsersLoaded:
      return { ...state, users: action.payload }
    case UserAction.UserAdded:
      return { ...state, users: [...state.users, action.payload] }
    case UserAction.UserDeleted:
      return { ...state, users: state.users.filter((v) => v && v._id !== action.payload) }
  }
}
