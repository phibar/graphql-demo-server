import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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

/** Test */
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
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  User: ResolverTypeWrapper<User>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ReferenceInput: ReferenceInput;
  UserCreateInput: UserCreateInput;
  Meme: ResolverTypeWrapper<Meme>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  MemeCreateInput: MemeCreateInput;
  Vote: ResolverTypeWrapper<Vote>;
  VoteCreateInput: VoteCreateInput;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Subscription: ResolverTypeWrapper<{}>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  User: User;
  String: Scalars['String'];
  ReferenceInput: ReferenceInput;
  UserCreateInput: UserCreateInput;
  Meme: Meme;
  Float: Scalars['Float'];
  MemeCreateInput: MemeCreateInput;
  Vote: Vote;
  VoteCreateInput: VoteCreateInput;
  Query: {};
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Subscription: {};
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wallet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  memes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Meme']>>>, ParentType, ContextType>;
  votes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Vote']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Meme'] = ResolversParentTypes['Meme']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  nft?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  votes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Vote']>>>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  meme?: Resolver<ResolversTypes['Meme'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  votes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Vote']>>>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  memes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Meme']>>>, ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createVote?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateVoteArgs, 'vote'>>;
  createUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
  createMeme?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateMemeArgs, 'meme'>>;
  deleteMeme?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteMemeArgs, 'id'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  deleteVote?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteVoteArgs, 'id'>>;
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  memeAdded?: SubscriptionResolver<Maybe<ResolversTypes['Meme']>, "memeAdded", ParentType, ContextType>;
  memeDeleted?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "memeDeleted", ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  User?: UserResolvers<ContextType>;
  Meme?: MemeResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
