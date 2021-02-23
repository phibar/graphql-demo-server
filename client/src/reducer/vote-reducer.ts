import { VoteActions } from '../actions/vote-actions'
import { VoteAction } from '../enums/vote-action'
import { IVoteListState } from '../interfaces/vote-list-state'

export const initState: IVoteListState = {
  votes: []
}

export const voteReducer = (state: IVoteListState = initState, action: VoteActions): IVoteListState => {
  switch (action.type) {
    case VoteAction.VotesLoaded:
      return { ...state, votes: action.payload }
    case VoteAction.VoteAdded:
      return { ...state, votes: [...state.votes, action.payload] }
    case VoteAction.VoteDeleted:
      return { ...state, votes: state.votes.filter((v) => v && v._id !== action.payload) }
  }
}
