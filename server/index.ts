import { ResolverContext } from './graphql/resolver-context'
import { resolvers } from './graphql/resolvers'
import { ApolloServer } from 'apollo-server'
import { schema } from './graphql/schema-loader'

import dotenv from 'dotenv'
import Textile from './textile/textitle'

dotenv.config()

Textile.Instance().then(async (t) => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
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
