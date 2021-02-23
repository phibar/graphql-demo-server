import { ResolverContext } from './graphql/resolver-context'
import { resolvers } from './graphql/resolvers'
import { ApolloServer, PubSub } from 'apollo-server'
import { schema } from './graphql/schema-loader'

import dotenv from 'dotenv'
import Textile from './textile/textitle'

dotenv.config()

const pubsub = new PubSub()

Textile.Instance().then(async (t) => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers(pubsub),
    introspection: true,
    playground: true,
    context: new ResolverContext(t),
    tracing: true
  })

  server.listen({ port: process.env.PORT || 4000 }).then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`)
    console.log(`🚀 Server ready at ${subscriptionsUrl}`)
  })
})
