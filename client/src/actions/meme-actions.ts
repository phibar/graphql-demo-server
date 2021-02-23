import { MemeAction } from '../enums/meme-action'
import { Maybe, Meme, User, Vote } from '../generated/generated-types'
import { IAction } from '../interfaces/action'

type MemesLoadedAction = IAction<
  MemeAction.MemesLoaded,
  Maybe<
    {
      __typename?: 'Meme' | undefined
    } & Pick<Meme, '_id' | 'name' | 'nft' | 'price'> & {
        owner?:
          | ({
              __typename?: 'User' | undefined
            } & Pick<User, 'name'>)
          | null
          | undefined
        votes?: Maybe<Array<Maybe<{ __typename?: 'Vote' } & Pick<Vote, '_id'>>>>
      }
  >[]
>
type MemesDeletedAction = IAction<MemeAction.MemeDeleted, string>
type MemesAddedAction = IAction<
  MemeAction.MemeAdded,
  {
    __typename?: 'Meme' | undefined
  } & Pick<Meme, '_id' | 'name' | 'nft' | 'price'> & {
      owner?:
        | ({
            __typename?: 'User' | undefined
          } & Pick<User, 'name'>)
        | null
        | undefined
      votes?: Maybe<Array<Maybe<{ __typename?: 'Vote' } & Pick<Vote, '_id'>>>>
    }
>

type MemesVotedAction = IAction<
  MemeAction.MemeVoted,
  {
    __typename?: 'Meme' | undefined
  } & Pick<Meme, '_id' | 'name' | 'nft' | 'price'> & {
      owner?:
        | ({
            __typename?: 'User' | undefined
          } & Pick<User, 'name'>)
        | null
        | undefined
      votes?: Maybe<Array<Maybe<{ __typename?: 'Vote' } & Pick<Vote, '_id'>>>>
    }
>

export type MemeActions = MemesLoadedAction | MemesDeletedAction | MemesAddedAction | MemesVotedAction
