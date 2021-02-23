import { AppAction } from '../enums/app-action'
import { Maybe, Meme, User } from '../generated/generated-types'
import { IAction } from '../interfaces/action'

type VotesLoadedAction = IAction<
  AppAction.MemesLoaded,
  Maybe<
    {
      __typename?: 'Meme' | undefined
    } & Pick<Meme, '_id' | 'name'> & {
        owner?:
          | ({
              __typename?: 'User' | undefined
            } & Pick<User, 'name'>)
          | null
          | undefined
      }
  >[]
>
type VotesDeletedAction = IAction<AppAction.MemeDeleted, string>
type VoteAddedAction = IAction<AppAction.MemeAdded, Meme>

export type AppActions = VotesLoadedAction | VotesDeletedAction | VoteAddedAction
