import { AppActions } from '../actions/app-actions'
import { AppAction } from '../enums/app-action'
import { IAppState } from '../interfaces/app-state'

export const initState: IAppState = {
  votes: []
}

export const appReducer = (state: IAppState = initState, action: AppActions): IAppState => {
  switch (action.type) {
    case AppAction.VotesLoaded:
      console.log('LOADED', action.payload)
      return { ...state, votes: action.payload }
    case AppAction.VoteAdded:
      return { ...state, votes: [...state.votes, action.payload] }
    case AppAction.VoteDeleted:
      return { ...state, votes: state.votes.filter((v) => v && v._id !== action.payload) }
  }
}
