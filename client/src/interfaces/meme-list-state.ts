import { Maybe, Meme, User, Vote } from '../generated/generated-types'

export interface IMemeListState {
  memes:Maybe<
  {
    __typename?: 'Meme' | undefined
  } & Pick<Meme, '_id' | 'name' | 'nft' | 'price'> & {
      owner?:
        | ({
            __typename?: 'User' | undefined
          } & Pick<User, 'name'>)
        | null
        | undefined
        votes?: Maybe<Array<Maybe<(
          { __typename?: 'Vote' }
          & Pick<Vote, '_id'>
        )>>> 
    }
>[]
}
