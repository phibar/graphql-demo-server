import { HttpLink, split, ApolloClient, InMemoryCache } from "@apollo/client"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"

const domain = process.env.NODE_ENV !== 'production' ? 'localhost:4000' : 'phibar-graphql-demo-server.herokuapp.com'
const secure = process.env.NODE_ENV !== 'production' ? false : true

const httpLink = new HttpLink({
  uri: `${secure ? 'https://' : 'http://'}${domain}`
})

const wsLink = new WebSocketLink({
  uri: `${secure ? 'wss://' : 'ws://'}${domain}/graphql`,
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})
