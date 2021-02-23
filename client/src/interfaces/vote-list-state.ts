import { Maybe, Vote, Meme, User } from '../generated/generated-types'

export interface IVoteListState {
  votes:Maybe<{
    __typename?: "Vote" | undefined;
} & Pick<Vote, "_id"> & {
    meme: {
        __typename?: "Meme" | undefined;
    } & Pick<Meme, "_id" | "name">;
    user: {
        __typename?: "User" | undefined;
    } & Pick<User, '_id' | 'name'>;
}>[]
}
