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
  _id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  wallet?: Maybe<Scalars['String']>;
  memes?: Maybe<Array<Maybe<Meme>>>;
  votes?: Maybe<Array<Maybe<Vote>>>;
};

export type ReferenceInput = {
  _id: Scalars['String'];
};

export type UserCreateInput = {
  name?: Maybe<Scalars['String']>;
  wallet?: Maybe<Scalars['String']>;
};

export type Meme = {
  __typename?: 'Meme';
  _id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  nft?: Maybe<Scalars['String']>;
  votes?: Maybe<Array<Maybe<Vote>>>;
  price?: Maybe<Scalars['Float']>;
};

export type MemeCreateInput = {
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<ReferenceInput>;
  nft?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};

export type Vote = {
  __typename?: 'Vote';
  _id: Scalars['String'];
  meme: Meme;
  user: User;
};

export type VoteCreateInput = {
  meme: ReferenceInput;
  user: ReferenceInput;
};

export type Query = {
  __typename?: 'Query';
  votes?: Maybe<Array<Maybe<Vote>>>;
  users?: Maybe<Array<Maybe<User>>>;
  memes?: Maybe<Array<Maybe<Meme>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createVote?: Maybe<Scalars['String']>;
  createUser?: Maybe<Scalars['String']>;
  createMeme?: Maybe<Scalars['String']>;
  deleteMeme?: Maybe<Scalars['Boolean']>;
  deleteUser?: Maybe<Scalars['Boolean']>;
  deleteVote?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateVoteArgs = {
  vote: VoteCreateInput;
};


export type MutationCreateUserArgs = {
  user: UserCreateInput;
};


export type MutationCreateMemeArgs = {
  meme: MemeCreateInput;
};


export type MutationDeleteMemeArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationDeleteVoteArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  memeAdded?: Maybe<Meme>;
  memeDeleted?: Maybe<Scalars['String']>;
  memeVoted?: Maybe<Meme>;
  voteAdded?: Maybe<Vote>;
  voteDeleted?: Maybe<Scalars['String']>;
  userAdded?: Maybe<User>;
  userDeleted?: Maybe<Scalars['String']>;
};

export type CreateMemeMutationVariables = Exact<{
  meme: MemeCreateInput;
}>;


export type CreateMemeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createMeme'>
);

export type CreateUserMutationVariables = Exact<{
  user: UserCreateInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createUser'>
);

export type CreateVoteMutationVariables = Exact<{
  vote: VoteCreateInput;
}>;


export type CreateVoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createVote'>
);

export type MemesQueryVariables = Exact<{ [key: string]: never; }>;


export type MemesQuery = (
  { __typename?: 'Query' }
  & { memes?: Maybe<Array<Maybe<(
    { __typename?: 'Meme' }
    & Pick<Meme, '_id' | 'name' | 'nft' | 'price'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'name'>
    )>, votes?: Maybe<Array<Maybe<(
      { __typename?: 'Vote' }
      & Pick<Vote, '_id'>
    )>>> }
  )>>> }
);

export type DeleteMemeMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteMemeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMeme'>
);

export type MemeAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MemeAddedSubscription = (
  { __typename?: 'Subscription' }
  & { memeAdded?: Maybe<(
    { __typename?: 'Meme' }
    & Pick<Meme, '_id' | 'name' | 'nft' | 'price'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'name'>
    )>, votes?: Maybe<Array<Maybe<(
      { __typename?: 'Vote' }
      & Pick<Vote, '_id'>
    )>>> }
  )> }
);

export type MemeDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MemeDeletedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'memeDeleted'>
);

export type MemeVotedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MemeVotedSubscription = (
  { __typename?: 'Subscription' }
  & { memeVoted?: Maybe<(
    { __typename?: 'Meme' }
    & Pick<Meme, '_id' | 'name' | 'nft' | 'price'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'name'>
    )>, votes?: Maybe<Array<Maybe<(
      { __typename?: 'Vote' }
      & Pick<Vote, '_id'>
    )>>> }
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'name' | 'wallet'>
    & { memes?: Maybe<Array<Maybe<(
      { __typename?: 'Meme' }
      & Pick<Meme, '_id'>
    )>>>, votes?: Maybe<Array<Maybe<(
      { __typename?: 'Vote' }
      & Pick<Vote, '_id'>
    )>>> }
  )>>> }
);

export type UserDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UserDeletedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'userDeleted'>
);

export type UserAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UserAddedSubscription = (
  { __typename?: 'Subscription' }
  & { userAdded?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'name' | 'wallet'>
    & { memes?: Maybe<Array<Maybe<(
      { __typename?: 'Meme' }
      & Pick<Meme, '_id'>
    )>>>, votes?: Maybe<Array<Maybe<(
      { __typename?: 'Vote' }
      & Pick<Vote, '_id'>
    )>>> }
  )> }
);

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type VotesQueryVariables = Exact<{ [key: string]: never; }>;


export type VotesQuery = (
  { __typename?: 'Query' }
  & { votes?: Maybe<Array<Maybe<(
    { __typename?: 'Vote' }
    & Pick<Vote, '_id'>
    & { meme: (
      { __typename?: 'Meme' }
      & Pick<Meme, '_id' | 'name'>
    ), user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name'>
    ) }
  )>>> }
);

export type DeleteVoteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteVoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteVote'>
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
    & Pick<Vote, '_id'>
    & { meme: (
      { __typename?: 'Meme' }
      & Pick<Meme, '_id' | 'name'>
    ), user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'name'>
    ) }
  )> }
);


export const CreateMemeDocument = gql`
    mutation createMeme($meme: MemeCreateInput!) {
  createMeme(meme: $meme)
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
 *      meme: // value for 'meme'
 *   },
 * });
 */
export function useCreateMemeMutation(baseOptions?: Apollo.MutationHookOptions<CreateMemeMutation, CreateMemeMutationVariables>) {
        return Apollo.useMutation<CreateMemeMutation, CreateMemeMutationVariables>(CreateMemeDocument, baseOptions);
      }
export type CreateMemeMutationHookResult = ReturnType<typeof useCreateMemeMutation>;
export type CreateMemeMutationResult = Apollo.MutationResult<CreateMemeMutation>;
export type CreateMemeMutationOptions = Apollo.BaseMutationOptions<CreateMemeMutation, CreateMemeMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($user: UserCreateInput!) {
  createUser(user: $user)
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const CreateVoteDocument = gql`
    mutation createVote($vote: VoteCreateInput!) {
  createVote(vote: $vote)
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
 *      vote: // value for 'vote'
 *   },
 * });
 */
export function useCreateVoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateVoteMutation, CreateVoteMutationVariables>) {
        return Apollo.useMutation<CreateVoteMutation, CreateVoteMutationVariables>(CreateVoteDocument, baseOptions);
      }
export type CreateVoteMutationHookResult = ReturnType<typeof useCreateVoteMutation>;
export type CreateVoteMutationResult = Apollo.MutationResult<CreateVoteMutation>;
export type CreateVoteMutationOptions = Apollo.BaseMutationOptions<CreateVoteMutation, CreateVoteMutationVariables>;
export const MemesDocument = gql`
    query memes {
  memes {
    _id
    name
    owner {
      name
    }
    votes {
      _id
    }
    nft
    price
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
export const MemeAddedDocument = gql`
    subscription memeAdded {
  memeAdded {
    _id
    name
    owner {
      name
    }
    votes {
      _id
    }
    nft
    price
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
export const MemeVotedDocument = gql`
    subscription memeVoted {
  memeVoted {
    _id
    name
    owner {
      name
    }
    votes {
      _id
    }
    nft
    price
  }
}
    `;

/**
 * __useMemeVotedSubscription__
 *
 * To run a query within a React component, call `useMemeVotedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMemeVotedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemeVotedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useMemeVotedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MemeVotedSubscription, MemeVotedSubscriptionVariables>) {
        return Apollo.useSubscription<MemeVotedSubscription, MemeVotedSubscriptionVariables>(MemeVotedDocument, baseOptions);
      }
export type MemeVotedSubscriptionHookResult = ReturnType<typeof useMemeVotedSubscription>;
export type MemeVotedSubscriptionResult = Apollo.SubscriptionResult<MemeVotedSubscription>;
export const UsersDocument = gql`
    query users {
  users {
    _id
    name
    wallet
    memes {
      _id
    }
    votes {
      _id
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserDeletedDocument = gql`
    subscription userDeleted {
  userDeleted
}
    `;

/**
 * __useUserDeletedSubscription__
 *
 * To run a query within a React component, call `useUserDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDeletedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUserDeletedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UserDeletedSubscription, UserDeletedSubscriptionVariables>) {
        return Apollo.useSubscription<UserDeletedSubscription, UserDeletedSubscriptionVariables>(UserDeletedDocument, baseOptions);
      }
export type UserDeletedSubscriptionHookResult = ReturnType<typeof useUserDeletedSubscription>;
export type UserDeletedSubscriptionResult = Apollo.SubscriptionResult<UserDeletedSubscription>;
export const UserAddedDocument = gql`
    subscription userAdded {
  userAdded {
    _id
    name
    wallet
    memes {
      _id
    }
    votes {
      _id
    }
  }
}
    `;

/**
 * __useUserAddedSubscription__
 *
 * To run a query within a React component, call `useUserAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUserAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UserAddedSubscription, UserAddedSubscriptionVariables>) {
        return Apollo.useSubscription<UserAddedSubscription, UserAddedSubscriptionVariables>(UserAddedDocument, baseOptions);
      }
export type UserAddedSubscriptionHookResult = ReturnType<typeof useUserAddedSubscription>;
export type UserAddedSubscriptionResult = Apollo.SubscriptionResult<UserAddedSubscription>;
export const DeleteUserDocument = gql`
    mutation deleteUser($id: String!) {
  deleteUser(id: $id)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const VotesDocument = gql`
    query votes {
  votes {
    _id
    meme {
      _id
      name
    }
    user {
      _id
      name
    }
  }
}
    `;

/**
 * __useVotesQuery__
 *
 * To run a query within a React component, call `useVotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVotesQuery({
 *   variables: {
 *   },
 * });
 */
export function useVotesQuery(baseOptions?: Apollo.QueryHookOptions<VotesQuery, VotesQueryVariables>) {
        return Apollo.useQuery<VotesQuery, VotesQueryVariables>(VotesDocument, baseOptions);
      }
export function useVotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VotesQuery, VotesQueryVariables>) {
          return Apollo.useLazyQuery<VotesQuery, VotesQueryVariables>(VotesDocument, baseOptions);
        }
export type VotesQueryHookResult = ReturnType<typeof useVotesQuery>;
export type VotesLazyQueryHookResult = ReturnType<typeof useVotesLazyQuery>;
export type VotesQueryResult = Apollo.QueryResult<VotesQuery, VotesQueryVariables>;
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
    meme {
      _id
      name
    }
    user {
      _id
      name
    }
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