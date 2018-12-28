import { GraphQLServer } from 'graphql-yoga';
import models from './database/models';
import resolvers from './resolvers';

const server = new GraphQLServer({
  typeDefs: './src/schema/schema.graphql',
  resolvers,
  context: {
    models
  }
});

server.start(() => console.log('Server is running on http://localhost:4000 🚀🚀🚀'));
