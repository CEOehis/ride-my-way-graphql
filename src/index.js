import { GraphQLServer } from 'graphql-yoga';
import models from './database/models';
import resolvers from './resolvers';
import { getAuthenticatedUser } from './utils/auth';
import { default as typeDefs } from './schema';

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: async ({ request }) => {
    const authedUser = await getAuthenticatedUser(request);

    return {
      models,
      authedUser,
    }
  }
});

const opts = {
  port: process.env.PORT || 4000
}

server.start((opts) => console.log(`Server is running on http://localhost:${opts.port} 🚀🚀🚀`));
