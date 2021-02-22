import { resolvers } from './graphql/resolvers';
import { createDatabase } from './textile/create-database';
import { ApolloServer } from "apollo-server";
import { schema } from "./graphql/schema-loader";

import dotenv from "dotenv";
import Textile from "./textile/textitle";

dotenv.config();

Textile.Instance().then(async(t)=>{
  await t.reset();
  await createDatabase(t);

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers:resolvers,
    introspection: true,
    playground: true,
    context: t
  });

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})


