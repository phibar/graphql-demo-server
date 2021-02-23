import { Resolvers, SubscriptionResolver, Vote } from '../generated/resolvers-types'
import Textile from '../textile/textitle'
import { PubSub } from 'apollo-server'

export const MEME_ADDED = 'VOTE_ADDED'
export const MEME_DELETED = 'VOTE_DELETED'

export const resolvers = (pubsub: PubSub): Resolvers<Textile> => {
  return {
    Query: {
      votes: async (_parent, _args, context) => await context.get('Vote'),
      memes: async (_parent, _args, context) => await context.get('Meme'),
      users: async (_parent, _args, context) => await context.get('User'),
    },
    Mutation: {
      createMeme: async (_parent, args, context) => {
        const meme = await context.createMeme(args.name)
        await pubsub.publish(MEME_ADDED, meme)
        return meme
      },
      deleteMeme: async (_parent, args, context) => {
        context.deleteMeme(args.id)
        pubsub.publish(MEME_DELETED, args.id)
        return args.id
      }
    },
    Subscription: {
      memeAdded: {
        subscribe: () => pubsub.asyncIterator(MEME_ADDED),
        resolve: (v: Vote) => v
      },
      memeDeleted: {
        subscribe: () => pubsub.asyncIterator(MEME_DELETED),
        resolve: (v: string) => v
      }
    }
  }
}
