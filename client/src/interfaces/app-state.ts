import { Maybe, Meme, User } from '../generated/generated-types'

export interface IAppState {
  votes: Maybe<
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
}
