import { Maybe } from 'graphql/jsutils/Maybe'
import { UserAction } from '../enums/user-action'
import { User, Meme, Vote } from '../generated/generated-types'
import { IAction } from '../interfaces/action'

type UsersLoadedAction = IAction<
  UserAction.UsersLoaded,
  Maybe<
    { __typename?: 'User' } & Pick<User, '_id' | 'name' | 'wallet'> & {
        memes?: Maybe<Array<Maybe<{ __typename?: 'Meme' } & Pick<Meme, '_id'>>>>
        votes?: Maybe<Array<Maybe<{ __typename?: 'Vote' } & Pick<Vote, '_id'>>>>
      }
  >[]
>
type UsersDeletedAction = IAction<UserAction.UserDeleted, string>
type UsersAddedAction = IAction<
  UserAction.UserAdded,
  Maybe<
    { __typename?: 'User' } & Pick<User, '_id' | 'name' | 'wallet'> & {
        memes?: Maybe<Array<Maybe<{ __typename?: 'Meme' } & Pick<Meme, '_id'>>>>
        votes?: Maybe<Array<Maybe<{ __typename?: 'Vote' } & Pick<Vote, '_id'>>>>
      }
  >
>

export type UserActions = UsersLoadedAction | UsersDeletedAction | UsersAddedAction
