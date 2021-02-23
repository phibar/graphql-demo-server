import {
  Vote,
  Maybe
} from '../generated/generated-types';

export interface IAppState {
  votes: Maybe<
    {
      __typename?: 'Vote' | undefined;
    } & Pick<Vote, 'NFT' | '_id'>
  >[];
}
