import { AppAction } from "../enums/app-action"
import { Maybe, Vote } from "../generated/generated-types"
import { IAction } from "../interfaces/action"

type VotesLoadedAction = IAction<
  AppAction.VotesLoaded,
  Maybe<
    {
      __typename?: 'Vote' | undefined
    } & Pick<Vote, 'NFT' | '_id'>
  >[]
>
type VotesDeletedAction = IAction<AppAction.VoteDeleted, string>
type VoteAddedAction = IAction<AppAction.VoteAdded, Vote>

export type AppActions = VotesLoadedAction | VotesDeletedAction | VoteAddedAction