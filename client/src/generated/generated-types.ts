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
  deleteVote?: Maybe<Scalars['String']>;
};


export type MutationCreateVoteArgs = {
  NFT: Scalars['String'];
};


export type MutationDeleteVoteArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  voteAdded?: Maybe<Vote>;
  voteDeleted?: Maybe<Scalars['String']>;
};

export type MyVotesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyVotesQuery = (
  { __typename?: 'Query' }
  & { votes: Array<Maybe<(
    { __typename?: 'Vote' }
    & Pick<Vote, 'NFT' | '_id'>
  )>> }
);

export type DeleteVoteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteVoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteVote'>
);

export type CreateVoteMutationVariables = Exact<{
  NFT: Scalars['String'];
}>;


export type CreateVoteMutation = (
  { __typename?: 'Mutation' }
  & { createVote: (
    { __typename?: 'Vote' }
    & Pick<Vote, 'NFT' | '_id'>
  ) }
);

export type VoteDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type VoteDeletedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'voteDeleted'>
);

export type VoteAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type VoteAddedSubscription = (
  { __typename?: 'Subscription' }
  & { voteAdded?: Maybe<(
    { __typename?: 'Vote' }
    & Pick<Vote, '_id' | 'NFT'>
  )> }
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
export const DeleteVoteDocument = gql`
    mutation deleteVote($id: String!) {
  deleteVote(id: $id)
}
    `;
export type DeleteVoteMutationFn = Apollo.MutationFunction<DeleteVoteMutation, DeleteVoteMutationVariables>;

/**
 * __useDeleteVoteMutation__
 *
 * To run a mutation, you first call `useDeleteVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVoteMutation, { data, loading, error }] = useDeleteVoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteVoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVoteMutation, DeleteVoteMutationVariables>) {
        return Apollo.useMutation<DeleteVoteMutation, DeleteVoteMutationVariables>(DeleteVoteDocument, baseOptions);
      }
export type DeleteVoteMutationHookResult = ReturnType<typeof useDeleteVoteMutation>;
export type DeleteVoteMutationResult = Apollo.MutationResult<DeleteVoteMutation>;
export type DeleteVoteMutationOptions = Apollo.BaseMutationOptions<DeleteVoteMutation, DeleteVoteMutationVariables>;
export const CreateVoteDocument = gql`
    mutation createVote($NFT: String!) {
  createVote(NFT: $NFT) {
    NFT
    _id
  }
}
    `;
export type CreateVoteMutationFn = Apollo.MutationFunction<CreateVoteMutation, CreateVoteMutationVariables>;

/**
 * __useCreateVoteMutation__
 *
 * To run a mutation, you first call `useCreateVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVoteMutation, { data, loading, error }] = useCreateVoteMutation({
 *   variables: {
 *      NFT: // value for 'NFT'
 *   },
 * });
 */
export function useCreateVoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateVoteMutation, CreateVoteMutationVariables>) {
        return Apollo.useMutation<CreateVoteMutation, CreateVoteMutationVariables>(CreateVoteDocument, baseOptions);
      }
export type CreateVoteMutationHookResult = ReturnType<typeof useCreateVoteMutation>;
export type CreateVoteMutationResult = Apollo.MutationResult<CreateVoteMutation>;
export type CreateVoteMutationOptions = Apollo.BaseMutationOptions<CreateVoteMutation, CreateVoteMutationVariables>;
export const VoteDeletedDocument = gql`
    subscription voteDeleted {
  voteDeleted
}
    `;

/**
 * __useVoteDeletedSubscription__
 *
 * To run a query within a React component, call `useVoteDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useVoteDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVoteDeletedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useVoteDeletedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<VoteDeletedSubscription, VoteDeletedSubscriptionVariables>) {
        return Apollo.useSubscription<VoteDeletedSubscription, VoteDeletedSubscriptionVariables>(VoteDeletedDocument, baseOptions);
      }
export type VoteDeletedSubscriptionHookResult = ReturnType<typeof useVoteDeletedSubscription>;
export type VoteDeletedSubscriptionResult = Apollo.SubscriptionResult<VoteDeletedSubscription>;
export const VoteAddedDocument = gql`
    subscription voteAdded {
  voteAdded {
    _id
    NFT
  }
}
    `;

/**
 * __useVoteAddedSubscription__
 *
 * To run a query within a React component, call `useVoteAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useVoteAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVoteAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useVoteAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<VoteAddedSubscription, VoteAddedSubscriptionVariables>) {
        return Apollo.useSubscription<VoteAddedSubscription, VoteAddedSubscriptionVariables>(VoteAddedDocument, baseOptions);
      }
export type VoteAddedSubscriptionHookResult = ReturnType<typeof useVoteAddedSubscription>;
export type VoteAddedSubscriptionResult = Apollo.SubscriptionResult<VoteAddedSubscription>;