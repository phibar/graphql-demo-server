import { VoteAction } from '../enums/vote-action'
import { Maybe, Vote, User, Meme } from '../generated/generated-types'
import { IAction } from '../interfaces/action'

type VotesLoadedAction = IAction<
  VoteAction.VotesLoaded,
  Maybe<
    {
      __typename?: 'Vote' | undefined
    } & Pick<Vote, '_id'> & {
        meme: {
          __typename?: 'Meme' | undefined
        } & Pick<Meme, '_id' | 'name'>
        user: {
          __typename?: 'User' | undefined
        } & Pick<User, '_id' | 'name'>
      }
  >[]
>
type VotesDeletedAction = IAction<VoteAction.VoteDeleted, string>
type VotesAddedAction = IAction<VoteAction.VoteAdded, Vote>

export type VoteActions = VotesLoadedAction | VotesDeletedAction | VotesAddedAction
