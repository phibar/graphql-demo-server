import { Maybe, Meme } from '../generated/generated-types'

export interface IAppState {
  votes: Maybe<
    {
      __typename?: 'Meme' | undefined
    } & Pick<Meme, '_id' | 'name' | 'NFT'>
  >[]
}
