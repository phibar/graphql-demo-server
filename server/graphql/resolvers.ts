import { Meme, Resolvers, User } from '../generated/resolvers-types'
import { ResolverContext } from './resolver-context'

export const MEME_ADDED = 'VOTE_ADDED'
export const MEME_DELETED = 'VOTE_DELETED'

export const resolvers: Resolvers<ResolverContext> = {
  Query: {
    votes: async (_p, _a, c) => await c.Vote.all(),
    memes: async (_p, _a, c) => await c.Meme.all(),
    users: async (_p, _a, c) => await c.User.all()
  },
  Mutation: {
    createVote: async (_p, a, c) => await c.Vote.create(a.vote),
    createMeme: async (_p, a, c) => await c.Meme.create(a.meme),
    createUser: async (_p, a, c) => await c.User.create(a.user),

    deleteMeme: async (_p, args, c) => c.Meme.deleteById(args.id),
    deleteUser: async (_p, args, c) => c.User.deleteById(args.id),
    deleteVote: async (_p, args, c) => c.Vote.deleteById(args.id)
  },
  Subscription: {
    memeAdded: {
      subscribe: (_p, _a, c) => c.Meme.subscribeCreate,
      resolve: (v: Meme) => v
    },
    memeDeleted: {
      subscribe: (_p, _a, c) => c.Meme.subscribeDelete,
      resolve: (v: string) => v
    }
  },
  Meme: {
    owner: async (parent, _args, c) => await c.User.getById(parent.owner?._id)
  },
  Vote: {
    meme: async (p, a, c) => await (c.Meme.getById(p.meme._id) as Promise<Meme>),
    user: async (p, a, c) => await (c.User.getById(p.user._id) as Promise<User>)
  }
}
