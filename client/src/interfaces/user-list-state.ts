import { Maybe } from 'graphql/jsutils/Maybe'
import { User, Meme, Vote } from '../generated/generated-types'

export interface IUserListState {
  users: Maybe<
    { __typename?: 'User' } & Pick<User, '_id' | 'name' | 'wallet'> & {
        memes?: Maybe<Array<Maybe<{ __typename?: 'Meme' } & Pick<Meme, '_id'>>>>
        votes?: Maybe<Array<Maybe<{ __typename?: 'Vote' } & Pick<Vote, '_id'>>>>
      }
  >[]
}
