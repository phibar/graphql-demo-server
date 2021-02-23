import { Meme } from './../generated/resolvers-types'
import { Resolvers } from '../generated/resolvers-types'
import Textile from '../textile/textitle'
import { PubSub } from 'apollo-server'

export const MEME_ADDED = 'VOTE_ADDED'
export const MEME_DELETED = 'VOTE_DELETED'

export const resolvers = (pubsub: PubSub): Resolvers<Textile> => {
  return {
    Query: {
      votes: async (_parent, _args, context) => await context.get('Vote'),
      memes: async (_parent, _args, context) => await context.get('Meme'),
      users: async (_parent, _args, context) => await context.get('User')
    },
    Mutation: {
      createMeme: async (_parent, args, context) => {
        const meme = await context.createMeme(args.name, args.ownerId)
        await pubsub.publish(MEME_ADDED, meme)
        return meme
      },
      deleteMeme: async (_parent, args, context) => {
        context.deleteMeme(args.id)
        pubsub.publish(MEME_DELETED, args.id)
        return args.id
      },
      createUser: async (_parent, args, context) => await context.createUser(args.name, args.wallet)
    },
    Subscription: {
      memeAdded: {
        subscribe: () => pubsub.asyncIterator(MEME_ADDED),
        resolve: (v: Meme) => v
      },
      memeDeleted: {
        subscribe: () => pubsub.asyncIterator(MEME_DELETED),
        resolve: (v: string) => v
      }
    },
    Meme: {
      owner: async (parent:any, args, context) =>  await context.getOwner(parent.ownerId)
      
    }
  }
}
