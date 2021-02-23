import { resolvers } from './graphql/resolvers'
import { createDatabase } from './textile/create-database'
import { ApolloServer, PubSub } from 'apollo-server'
import { schema } from './graphql/schema-loader'

import dotenv from 'dotenv'
import Textile from './textile/textitle'

dotenv.config()

const pubsub = new PubSub()

Textile.Instance().then(async (t) => {
  await t.reset()
  await createDatabase(t)

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers(pubsub),
    introspection: true,
    playground: true,
    context: t,
    tracing: true
  })

  server.listen({ port: process.env.PORT || 4000 }).then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`)
    console.log(`🚀 Server ready at ${subscriptionsUrl}`)
  })
})
