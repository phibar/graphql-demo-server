import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Vote = {
  __typename?: 'Vote';
  _id: Scalars['String'];
  NFT: Scalars['String'];
  test?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  votes: Array<Maybe<Vote>>;
  vote?: Maybe<Vote>;
};


export type QueryVoteArgs = {
  id?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createVote: Vote;
};


export type MutationCreateVoteArgs = {
  NFT: Scalars['String'];
};

export type MyVotesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyVotesQuery = (
  { __typename?: 'Query' }
  & { votes: Array<Maybe<(
    { __typename?: 'Vote' }
    & Pick<Vote, 'NFT' | '_id'>
  )>> }
);


export const MyVotesDocument = gql`
    query MyVotes {
  votes {
    NFT
    _id
  }
}
    `;

/**
 * __useMyVotesQuery__
 *
 * To run a query within a React component, call `useMyVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyVotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyVotesQuery(baseOptions?: Apollo.QueryHookOptions<MyVotesQuery, MyVotesQueryVariables>) {
        return Apollo.useQuery<MyVotesQuery, MyVotesQueryVariables>(MyVotesDocument, baseOptions);
      }
export function useMyVotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyVotesQuery, MyVotesQueryVariables>) {
          return Apollo.useLazyQuery<MyVotesQuery, MyVotesQueryVariables>(MyVotesDocument, baseOptions);
        }
export type MyVotesQueryHookResult = ReturnType<typeof useMyVotesQuery>;
export type MyVotesLazyQueryHookResult = ReturnType<typeof useMyVotesLazyQuery>;
export type MyVotesQueryResult = Apollo.QueryResult<MyVotesQuery, MyVotesQueryVariables>;