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

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  wallet?: Maybe<Scalars['String']>;
};

export type Meme = {
  __typename?: 'Meme';
  _id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  NFT?: Maybe<Scalars['String']>;
};

export type Vote = {
  __typename?: 'Vote';
  _id: Scalars['String'];
  NFT: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  votes?: Maybe<Array<Maybe<Vote>>>;
  users?: Maybe<Array<Maybe<User>>>;
  memes?: Maybe<Array<Maybe<Meme>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMeme: Meme;
  deleteMeme?: Maybe<Scalars['String']>;
};


export type MutationCreateMemeArgs = {
  name: Scalars['String'];
};


export type MutationDeleteMemeArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  memeAdded?: Maybe<Meme>;
  memeDeleted?: Maybe<Scalars['String']>;
};

export type MemesQueryVariables = Exact<{ [key: string]: never; }>;


export type MemesQuery = (
  { __typename?: 'Query' }
  & { memes?: Maybe<Array<Maybe<(
    { __typename?: 'Meme' }
    & Pick<Meme, '_id' | 'name' | 'NFT'>
  )>>> }
);

export type DeleteMemeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteMemeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMeme'>
);

export type CreateMemeMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateMemeMutation = (
  { __typename?: 'Mutation' }
  & { createMeme: (
    { __typename?: 'Meme' }
    & Pick<Meme, 'NFT' | 'name' | '_id'>
  ) }
);

export type MemeDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MemeDeletedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'memeDeleted'>
);

export type MemeAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MemeAddedSubscription = (
  { __typename?: 'Subscription' }
  & { memeAdded?: Maybe<(
    { __typename?: 'Meme' }
    & Pick<Meme, '_id' | 'NFT' | 'name'>
  )> }
);


export const MemesDocument = gql`
    query Memes {
  memes {
    _id
    name
    NFT
  }
}
    `;

/**
 * __useMemesQuery__
 *
 * To run a query within a React component, call `useMemesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMemesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMemesQuery(baseOptions?: Apollo.QueryHookOptions<MemesQuery, MemesQueryVariables>) {
        return Apollo.useQuery<MemesQuery, MemesQueryVariables>(MemesDocument, baseOptions);
      }
export function useMemesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MemesQuery, MemesQueryVariables>) {
          return Apollo.useLazyQuery<MemesQuery, MemesQueryVariables>(MemesDocument, baseOptions);
        }
export type MemesQueryHookResult = ReturnType<typeof useMemesQuery>;
export type MemesLazyQueryHookResult = ReturnType<typeof useMemesLazyQuery>;
export type MemesQueryResult = Apollo.QueryResult<MemesQuery, MemesQueryVariables>;
export const DeleteMemeDocument = gql`
    mutation deleteMeme($id: String!) {
  deleteMeme(id: $id)
}
    `;
export type DeleteMemeMutationFn = Apollo.MutationFunction<DeleteMemeMutation, DeleteMemeMutationVariables>;

/**
 * __useDeleteMemeMutation__
 *
 * To run a mutation, you first call `useDeleteMemeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMemeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMemeMutation, { data, loading, error }] = useDeleteMemeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMemeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMemeMutation, DeleteMemeMutationVariables>) {
        return Apollo.useMutation<DeleteMemeMutation, DeleteMemeMutationVariables>(DeleteMemeDocument, baseOptions);
      }
export type DeleteMemeMutationHookResult = ReturnType<typeof useDeleteMemeMutation>;
export type DeleteMemeMutationResult = Apollo.MutationResult<DeleteMemeMutation>;
export type DeleteMemeMutationOptions = Apollo.BaseMutationOptions<DeleteMemeMutation, DeleteMemeMutationVariables>;
export const CreateMemeDocument = gql`
    mutation createMeme($name: String!) {
  createMeme(name: $name) {
    NFT
    name
    _id
  }
}
    `;
export type CreateMemeMutationFn = Apollo.MutationFunction<CreateMemeMutation, CreateMemeMutationVariables>;

/**
 * __useCreateMemeMutation__
 *
 * To run a mutation, you first call `useCreateMemeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMemeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMemeMutation, { data, loading, error }] = useCreateMemeMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateMemeMutation(baseOptions?: Apollo.MutationHookOptions<CreateMemeMutation, CreateMemeMutationVariables>) {
        return Apollo.useMutation<CreateMemeMutation, CreateMemeMutationVariables>(CreateMemeDocument, baseOptions);
      }
export type CreateMemeMutationHookResult = ReturnType<typeof useCreateMemeMutation>;
export type CreateMemeMutationResult = Apollo.MutationResult<CreateMemeMutation>;
export type CreateMemeMutationOptions = Apollo.BaseMutationOptions<CreateMemeMutation, CreateMemeMutationVariables>;
export const MemeDeletedDocument = gql`
    subscription memeDeleted {
  memeDeleted
}
    `;

/**
 * __useMemeDeletedSubscription__
 *
 * To run a query within a React component, call `useMemeDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMemeDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemeDeletedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMemeDeletedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MemeDeletedSubscription, MemeDeletedSubscriptionVariables>) {
        return Apollo.useSubscription<MemeDeletedSubscription, MemeDeletedSubscriptionVariables>(MemeDeletedDocument, baseOptions);
      }
export type MemeDeletedSubscriptionHookResult = ReturnType<typeof useMemeDeletedSubscription>;
export type MemeDeletedSubscriptionResult = Apollo.SubscriptionResult<MemeDeletedSubscription>;
export const MemeAddedDocument = gql`
    subscription memeAdded {
  memeAdded {
    _id
    NFT
    name
  }
}
    `;

/**
 * __useMemeAddedSubscription__
 *
 * To run a query within a React component, call `useMemeAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMemeAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemeAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMemeAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MemeAddedSubscription, MemeAddedSubscriptionVariables>) {
        return Apollo.useSubscription<MemeAddedSubscription, MemeAddedSubscriptionVariables>(MemeAddedDocument, baseOptions);
      }
export type MemeAddedSubscriptionHookResult = ReturnType<typeof useMemeAddedSubscription>;
export type MemeAddedSubscriptionResult = Apollo.SubscriptionResult<MemeAddedSubscription>;