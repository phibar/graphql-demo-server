import { AppAction } from '../enums/app-action'
import { Maybe, Meme } from '../generated/generated-types'
import { IAction } from '../interfaces/action'

type VotesLoadedAction = IAction<
  AppAction.MemesLoaded,

  Maybe<
    {
      __typename?: 'Meme' | undefined
    } & Pick<Meme, '_id' | 'name' | 'NFT'>
  >[]
>
type VotesDeletedAction = IAction<AppAction.MemeDeleted, string>
type VoteAddedAction = IAction<AppAction.MemeAdded, Meme>

export type AppActions = VotesLoadedAction | VotesDeletedAction | VoteAddedAction
