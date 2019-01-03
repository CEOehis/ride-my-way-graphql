import { GraphQLServer } from 'graphql-yoga';
import models from './database/models';
import resolvers from './resolvers';
import { getAuthenticatedUser } from './utils/auth';

const server = new GraphQLServer({
  typeDefs: './src/schema/schema.graphql',
  resolvers,
  context: async ({ request }) => {
    const authedUser = await getAuthenticatedUser(request);

    return {
      models,
      authedUser,
    }
  }
});

server.start(() => console.log('Server is running on http://localhost:4000 🚀🚀🚀'));
