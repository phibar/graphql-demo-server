import { Resolvers, SubscriptionResolver, Vote } from '../generated/resolvers-types'
import Textile from '../textile/textitle'
import { PubSub } from 'apollo-server'

export const VOTE_ADDED = 'VOTE_ADDED'
export const VOTE_DELETED = 'VOTE_DELETED'

export const resolvers = (pubsub: PubSub): Resolvers<Textile> => {
  return {
    Query: {
      votes: async (parent, args, context) => await context.get('Vote'),
      vote: async (parent, args, context) => await context.getSingleById('Vote', args.id || '')
    },
    Mutation: {
      createVote: async (parent, args, context) => {
        const vote = await context.createVote(args.NFT)
        await pubsub.publish(VOTE_ADDED, vote)
        return vote
      },
      deleteVote: async (parent, args, context) => {
        context.deleteVote(args.id)
        pubsub.publish(VOTE_DELETED, args.id)
        return args.id
      }
    },
    Subscription: {
      voteAdded: {
        subscribe: () => pubsub.asyncIterator(VOTE_ADDED),
        resolve: (v: Vote) => v
      },
      voteDeleted: {
        subscribe: () => pubsub.asyncIterator(VOTE_DELETED),
        resolve: (v: string) => v
      }
    }
  }
}
